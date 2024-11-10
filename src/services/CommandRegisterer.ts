import { globalCommands } from "../modules";
import { REST, Routes } from "discord.js";
import { DISCORD_API_VERSION, DISCORD_CLIENT_ID, DISCORD_TOKEN } from "../config";
import { getGuildCommands } from "../modules/GuildCommandsResolver";
import { Command } from "../types/Command";


export async function registerCommands(guilds) {
    const rest = new REST({version: DISCORD_API_VERSION}).setToken(DISCORD_TOKEN);

    registerGlobalCommands(rest).then();
    for (const guild of guilds) {
        registerGuildCommands(rest, guild.id).then();
    }
}

export async function registerGlobalCommands(rest: REST) {
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
}

export async function registerGuildCommands(rest: REST, guildId: string) {
    const guildCommands = await getGuildCommands(guildId);
    const guildCommandsData = Object.values(guildCommands).map((command: Command) => command.data);
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