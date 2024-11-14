import { getGuildCommands as getModuleGuildCommands } from './index';
import { getEnabledGuildModules } from './GuildModulesResolver';

export async function getGuildCommands(guild) {
    const modules = await getEnabledGuildModules(guild);
    const allModuleCommands = await getModuleGuildCommands(guild);
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