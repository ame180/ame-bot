import { GuildConfigModel } from '../models';

export const ModulesConfigName = 'modules';

export type ModulesConfig =
{
    [key: string]: boolean
}

export async function isGuildModuleEnabled(guild, moduleName: string): Promise<boolean> {
    const guildConfig = await GuildConfigModel.findOne({
        where: {
            guildId: guild.id,
            name: ModulesConfigName
        }
    });
    if (!guildConfig) return false;

    const config: ModulesConfig = guildConfig.value;
    return !!config[moduleName];
}

export async function getEnabledGuildModules(guild): Promise<string[]> {
    const guildConfig = await GuildConfigModel.findOne({
        where: {
            guildId: guild.id,
            name: ModulesConfigName
        }
    });
    if (!guildConfig) return [];

    const config: ModulesConfig = guildConfig.value;
    const enabledModules: string[] = [];

    let module: keyof ModulesConfig;
    for (module in config)
    {
        if (config[module]) enabledModules.push(module);
    }

    return enabledModules;
}