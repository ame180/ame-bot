import { guildCommands } from "./index";
import { getEnabledGuildModules } from "./GuildModulesResolver";

export async function getGuildCommands(guildId: string) {
    const modules = await getEnabledGuildModules(guildId);
    let commands = {};
    for (const module of modules)
    {
        const moduleCommands = guildCommands[module];
        commands = {
            ...commands,
            ...moduleCommands
        };
    }

    return commands;
}