import { CommandInteraction, SlashCommandBuilder} from "discord.js";
import { User, UserGuild } from '../models';
import {getCommandUserGuild} from "../services/CommandUserGuildResolver";

const levelOneXp = 100;

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

    let level = 0;
    let xp = userGuild.xp;
    let xpNeeded = levelOneXp;
    while (xp >= xpNeeded) {
        level++;
        xp -= xpNeeded;
        xpNeeded = 5 * Math.pow(level, 2) + (50 * level) + levelOneXp;
    }

    const message = targetUser
        ? `${targetUser.username} is level ${level}! ${xp}/${xpNeeded} XP`
        : `You are level ${level}! ${xp}/${xpNeeded} XP`;
    await interaction.reply(message);
}