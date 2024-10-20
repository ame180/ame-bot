import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import {getCommandUserGuild} from "../services/CommandUserGuildResolver";

export const data = new SlashCommandBuilder()
    .setName("xp")
    .setDescription("Replies with your current XP!")
    .addUserOption(option =>
        option.setName('user')
            .setDescription('The user to get XP for')
            .setRequired(false)
    );

export async function execute(interaction: CommandInteraction) {
    const [userGuild, targetUser] = await getCommandUserGuild(interaction);

    if (!userGuild || !userGuild.xp) {
        const message = targetUser ? `${targetUser.username} doesn't have any XP yet!` : "You don't have any XP yet!";
        await interaction.reply(message);

        return;
    }

    const message = targetUser ? `${targetUser.username} has ${userGuild.xp} XP!` : `You have ${userGuild.xp} XP!`;
    await interaction.reply(message);
}