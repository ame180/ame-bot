import { CommandInteraction, SlashCommandBuilder} from "discord.js";
import { getCommandUserGuild } from "../services/CommandUserGuildResolver";
import {calculateLevel} from "../services/LevelCalculator";

export const data = new SlashCommandBuilder()
    .setName("level")
    .setDescription("Replies with your current Level!")
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

    const { level, xpLeft, xpNeeded } = calculateLevel(userGuild.xp);

    const message = targetUser
        ? `${targetUser.username} is level ${level}! ${xpLeft}/${xpNeeded} XP`
        : `You are level ${level}! ${xpLeft}/${xpNeeded} XP`;
    await interaction.reply(message);
}