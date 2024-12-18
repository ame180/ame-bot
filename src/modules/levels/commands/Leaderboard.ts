import { bold, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { UserGuildModel, UserModel } from '../../../models';
import { calculateLevel } from '../../../services/LevelCalculator';

export const data = new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Returns the current TOP 5 leaderboard!');

export async function execute(interaction: CommandInteraction) {
    const leaderboard = new EmbedBuilder()
        .setTitle('🏆 Leaderboard 🏆')
        .setDescription('The current TOP 5 users based on XP!')
        .setTimestamp();

    const userGuilds = await UserGuildModel.findAll({
        order: [
            ['xp', 'DESC']
        ],
        limit: 5,
        include: UserModel,
        where: {
            externalId: interaction.guildId
        }
    });

    let i = 1;
    for (const userGuild of userGuilds) {
        const user = await userGuild.getUser();
        const displayName = userGuild.userDisplayName || user.displayName;
        const { level } = calculateLevel(userGuild.xp);

        const fieldTitle = bold(`#${i++} ${displayName}`);
        const fieldValue = `Level: ${level} | XP: ${userGuild.xp}`;

        // noinspection TypeScriptValidateTypes
        leaderboard.addFields({
            name: fieldTitle,
            value: fieldValue,
        });
    }

    await interaction.reply({
        embeds: [leaderboard]
    });
}