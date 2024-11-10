import { Events } from "discord.js";
import { registerCommands } from "../services/CommandRegisterer";
import {updateGuilds} from "../services/GuildUpdater";

export const name = Events.ClientReady;
export const once = true;
export async function execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const guilds = client.guilds.cache.map((guild) => {
        return {
            id: guild.id,
            name: guild.name
        }
    });
    registerCommands(guilds).then();
    updateGuilds(guilds).then();
}