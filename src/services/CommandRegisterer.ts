import {commands} from "../modules";
import {REST, Routes} from "discord.js";
import {DISCORD_API_VERSION, DISCORD_CLIENT_ID, DISCORD_TOKEN} from "../config";


export async function registerCommands(guildIds: string[]) {
    const commandsData = Object.values(commands).map((command) => command.data);
    const count = commandsData.length;

    const rest = new REST({version: DISCORD_API_VERSION}).setToken(DISCORD_TOKEN);

    try {
        console.log(`Started refreshing ${count} application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),
            {
                body: commandsData
            },
        );

        console.log(`Successfully reloaded ${count} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}