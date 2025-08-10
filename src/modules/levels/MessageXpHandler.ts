import { UserModel, UserGuildModel, GuildConfigModel, GuildModel } from '../../models';
import { config } from '../../config/configLoader';
import { Events } from 'discord.js';
import { calculateLevel } from './LevelCalculator';
import { LevelsConfigName, resolveLevelRole, type LevelsConfig } from './LevelsConfigResolver';

export const eventName = Events.MessageCreate;

export async function handle(message) {
    if (message.author.bot) return;

    const [user] = await UserModel.findOrCreate({ where: { externalId: message.author.id } });
    user.username = message.author.username;
    user.displayName = message.author.displayName;
    user.avatar = message.author.avatarURL();
    await user.save();

    const [userGuild] = await UserGuildModel.findOrCreate({
        where: {
            externalId: message.guildId,
            userId: user.id
        }
    });
    userGuild.userDisplayName = message.member.displayName;
    userGuild.messageCount++;
    await userGuild.save();


    if (userGuild.lastMessageAt && ((new Date()).getTime() - userGuild.lastMessageAt.getTime()) / 1000 < config.xpCooldown) return;

    const { level: previousLevel } = calculateLevel(userGuild.xp || 0);

    const xpGain = Math.floor(Math.random() * (config.maxXpPerMessage - config.minXpPerMessage + 1) + config.minXpPerMessage);
    userGuild.xp += xpGain;
    userGuild.lastMessageAt = new Date();

    await userGuild.save();

    const { level: newLevel } = calculateLevel(userGuild.xp || 0);
    if (newLevel <= previousLevel) return;

    try {
        const guild = await GuildModel.findOne({ where: { externalId: message.guildId } });
        if (!guild) return;

        const guildConfig = await GuildConfigModel.findOne({ where: { guildId: guild.id, name: LevelsConfigName } });
        if (!guildConfig) return;

        const configValue = guildConfig.value as LevelsConfig;
        const { roleId: newRoleId, allRoleIds } = resolveLevelRole(configValue, newLevel);
        if (!newRoleId) return;

        if (!message.guild) return;
        const member = message.member || await message.guild.members.fetch(message.author.id).catch(() => null);
        if (!member) return;

        const rolesToRemove = allRoleIds.filter(rid => rid !== newRoleId && member.roles.cache.has(rid));
        for (const rid of rolesToRemove) {
            await member.roles.remove(rid).catch((err) => {
                console.debug(
                    `[levels] failed to remove old level role ${rid} for user ${message.author.id} in guild ${message.guildId}`,
                    err
                );
            });
        }

        if (!member.roles.cache.has(newRoleId)) {
            await member.roles.add(newRoleId).catch((err) => {
                console.debug(
                    `[levels] failed to add new level role ${newRoleId} for user ${member.id} (${member.user?.username}) in guild ${member.guild?.id} (${member.guild?.name})`,
                    err
                );
            });
        }
    } catch (err) {
        console.error(
            `[levels] level role assignment error for user ${message.author?.id} in guild ${message.guildId}`,
            err
        );
    }
}