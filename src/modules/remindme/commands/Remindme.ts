import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { ReminderModel, UserModel, GuildModel } from '../../../models';

export const data = new SlashCommandBuilder()
    .setName('remindme')
    .setDescription('Set a reminder for yourself')
    .addIntegerOption(option =>
        option.setName('minutes')
            .setDescription('Number of minutes until the reminder')
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(60 * 24 * 365)
    )
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Message to include with the reminder (optional)')
            .setRequired(false)
    )
    .addBooleanOption(option =>
        option.setName('send_as_dm')
            .setDescription('Deliver the reminder privately (DM) instead of in the channel (default: true)')
            .setRequired(false)
    );

export async function execute(interaction: CommandInteraction) {
    const minutes = interaction.options.get('minutes').value as number;
    const message = interaction.options.get('message')?.value as string;
    const sendAsDM = (interaction.options.get('send_as_dm')?.value as boolean) ?? true;

    const pingTime = new Date();
    pingTime.setMinutes(pingTime.getMinutes() + minutes);

    try {
        const [user] = await UserModel.findOrCreate({
            where: { externalId: interaction.user.id }
        });

        user.username = interaction.user.username;
        user.displayName = interaction.user.displayName;
        user.avatar = interaction.user.avatarURL();
        await user.save();

        const guild = await GuildModel.findOne({
            where: { externalId: interaction.guild.id }
        });

        if (!guild) {
            await interaction.reply({
                content: 'This guild is not properly registered in the system.',
                ephemeral: true
            });
            
            return;
        }

        const reminder = await ReminderModel.create({
            guildId: guild.id,
            userId: user.id,
            channelId: interaction.channel.id,
            message: message || null,
            pingTime: pingTime,
            sendAsDM: sendAsDM
        });

        await reminder.save();

        // Format time until reminder
        let timeMessage = '';
        if (minutes < 60) {
            timeMessage = `${minutes} minute${minutes === 1 ? '' : 's'}`;
        } else if (minutes < 60 * 24) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            timeMessage = `${hours} hour${hours === 1 ? '' : 's'}`;
            if (remainingMinutes > 0) {
                timeMessage += ` and ${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'}`;
            }
        } else {
            const days = Math.floor(minutes / 1440);
            const remainingHours = Math.floor((minutes % 1440) / 60);
            timeMessage = `${days} day${days === 1 ? '' : 's'}`;
            if (remainingHours > 0) {
                timeMessage += ` and ${remainingHours} hour${remainingHours === 1 ? '' : 's'}`;
            }
        }

        let replyMessage = `I'll remind you in ${timeMessage}`;
        if (message) {
            replyMessage += ` with the message: "${message}"`;
        }
        if (sendAsDM) {
            replyMessage += ' (sent via DM)';
        } else {
            replyMessage += ' (posted in this channel)';
        }
        await interaction.reply({ content: replyMessage, ephemeral: true });
    } catch (error) {
        console.error('Error creating reminder:', error);
        await interaction.reply({
            content: 'There was an error creating your reminder. Please try again.',
            ephemeral: true
        });
    }
}