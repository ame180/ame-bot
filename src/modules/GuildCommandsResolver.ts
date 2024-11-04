import { guildCommands } from "./index";
import { GuildConfigModel } from "../models";

export const ModulesConfigName = 'modules';

export type ModulesConfig = {
    [key: string]: boolean
}

export async function getGuildCommands(guildId: string) {
    const guildConfig = await GuildConfigModel.findOne({
        where: {
            guildId: guildId,
            name: ModulesConfigName
        }
    });
    if (!guildConfig) return {};

    const config: ModulesConfig = guildConfig.value;

    let commands = {};
    let module: keyof ModulesConfig;
    for (module in config)
    {
        if (!config[module]) continue;

        const moduleCommands = guildCommands[module];
        commands = {
            ...commands,
            ...moduleCommands
        };
    }

    return commands;
}