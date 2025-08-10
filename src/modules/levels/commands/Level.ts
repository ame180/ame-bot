import { bold, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getCommandUserGuild } from '../../../services/CommandUserGuildResolver';
import { calculateLevel } from '../LevelCalculator';
import { UserGuildModel } from '../../../models';
import { Op } from 'sequelize';

export const data = new SlashCommandBuilder()
    .setName('level')
    .setDescription('Replies with your current Level!')
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user to get Level for')
            .setRequired(false)
    );

export async function execute(interaction: CommandInteraction) {
    const [userGuild, targetUser] = await getCommandUserGuild(interaction);

    if (!userGuild || !userGuild.xp) {
        const message = targetUser ? `${targetUser.username} doesn't have any XP yet!` : "You don't have any XP yet!";
        await interaction.reply(message);

        return;
    }

    const totalXp = userGuild.xp;
    const { level, xpLeft, xpNeeded } = calculateLevel(totalXp);

    let rank = 1;
    const higherXpCount = await UserGuildModel.count({
        where: {
            externalId: interaction.guildId,
            xp: { [Op.gt]: totalXp },
        },
    });
    rank = higherXpCount + 1;

    // Progress bar (10 segments)
    const segments = 10;
    const progress = xpLeft / xpNeeded;
    const filled = Math.max(0, Math.min(segments, Math.round(progress * segments)));
    const bar = `${'█'.repeat(filled)}${'░'.repeat(segments - filled)}`;

    const user = await userGuild.getUser();
    const displayName = userGuild.userDisplayName || user.displayName;
    const subjectName = targetUser ? targetUser.username : interaction.user.username;

    const embed = new EmbedBuilder()
        .setTitle('📊 Level Stats')
        .setDescription(`${bold(displayName)}'s current progression`)
        .addFields(
            { name: 'User', value: subjectName, inline: true },
            { name: 'Rank', value: `#${rank}`, inline: true },
            { name: 'Level', value: `${level}`, inline: true },
            { name: 'Progress', value: `${bar} ${xpLeft}/${xpNeeded} XP`, inline: false },
        )
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}