import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { User, UserGuild } from '../models';

export const data = new SlashCommandBuilder()
    .setName("xp")
    .setDescription("Replies with your current XP!")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user to get XP for')
            .setRequired(false)
    );

export async function execute(interaction: CommandInteraction) {
    const userGuild = await UserGuild.findOne({
        where: {
            externalId: interaction.guildId
        },
        include: {
            model: User,
            where: { externalId: interaction.user.id }
        }
    });
    if (!userGuild || !userGuild.xp) {
        await interaction.reply("You don't have any XP yet!");
    } else {
        await interaction.reply(`You have ${userGuild.xp} XP!`);
    }
}