import { Events, Client } from 'discord.js';
import { registerCommands } from '../services/CommandRegisterer';
import { updateGuilds } from '../services/GuildUpdater';
import { runModuleSetups } from '../modules';

export const name = Events.ClientReady;
export const once = true;
export async function execute(client: Client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const guilds = client.guilds.cache.map((guild) => {
        return {
            id: guild.id,
            name: guild.name
        }
    });

    // Update guilds before attempting to register commands for them
    await updateGuilds(guilds);

    void registerCommands(guilds);
    void runModuleSetups(client);
}