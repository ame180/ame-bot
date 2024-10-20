import { CommandInteraction, SlashCommandBuilder} from "discord.js";
import { User, UserGuild } from '../models';

const levelOneXp = 100;

export const data = new SlashCommandBuilder()
    .setName("level")
    .setDescription("Replies with your current XP!");

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
        let level = 0;
        let xp = userGuild.xp;
        let xpNeeded = levelOneXp;
        while (xp >= xpNeeded) {
            level++;
            xp -= xpNeeded;
            xpNeeded = 5 * Math.pow(level, 2) + (50 * level) + levelOneXp;
        }

        await interaction.reply(`You are level ${level}! ${xp}/${xpNeeded} XP`);
    }
}