import { globalCommands } from "../modules";
import { REST, Routes } from "discord.js";
import { DISCORD_API_VERSION, DISCORD_CLIENT_ID, DISCORD_TOKEN } from "../config";
import {getGuildCommands} from "../modules/GuildCommandsResolver";


export async function registerCommands(guildIds: string[]) {
    const rest = new REST({version: DISCORD_API_VERSION}).setToken(DISCORD_TOKEN);

    const globalCommandsData = Object.values(globalCommands).map((command) => command.data);
    const globalCommandsCount = globalCommandsData.length;

    console.log(`Started refreshing ${globalCommandsCount} global (/) commands.`);
    rest.put(
        Routes.applicationCommands(DISCORD_CLIENT_ID),
        {
            body: globalCommandsData
        },
    ).then(() => {
        console.log(`Successfully reloaded ${globalCommandsCount} global (/) commands.`);
    }).catch((error) => {
        console.error(error);
    });

    for (const guildId of guildIds) {
        const guildCommandsData = Object.values(getGuildCommands(guildId)).map((command) => command.data);
        const guildCommandsCount = guildCommandsData.length;
        console.log(`Started refreshing ${guildCommandsCount} guild (/) commands for ${guildId}.`);

        rest.put(
            Routes.applicationGuildCommands(DISCORD_CLIENT_ID, guildId),
            {
                body: guildCommandsData
            },
        ).then(() => {
            console.log(`Successfully reloaded ${guildCommandsCount} guild (/) commands for ${guildId}.`);
        }).catch((error) => {
            console.error(error);
        });
    }
}