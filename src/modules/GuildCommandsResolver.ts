import { getGuildCommands as getModuleGuildCommands } from "./index";
import { getEnabledGuildModules } from "./GuildModulesResolver";

export async function getGuildCommands(guildId: string) {
    const modules = await getEnabledGuildModules(guildId);
    const allModuleCommands = await getModuleGuildCommands(guildId);
    let commands = {};
    for (const module of modules)
    {
        const moduleCommands = allModuleCommands[module];
        commands = {
            ...commands,
            ...moduleCommands
        };
    }

    return commands;
}