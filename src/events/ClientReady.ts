import { Events } from "discord.js";
import { registerCommands } from "../services/CommandRegisterer";

export const name = Events.ClientReady;
export const once = true;
export async function execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const guildIds = client.guilds.cache.map(guild => guild.id);
    await registerCommands(guildIds);
}