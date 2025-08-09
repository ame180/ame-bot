import { Events, MessageReaction, PartialMessageReaction, PartialUser, User } from 'discord.js';
import { GuildConfigModel, GuildModel } from '../../../models';
import { ReactionRolesConfigName, normalizeEmoji } from '../ReactionRolesService';
import type { ReactionRolesConfig, Panel } from '../ReactionRolesService';

export const eventName = Events.MessageReactionAdd;

export async function handle(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
    try {
        if (user.bot) return;

        if (reaction.partial) {
            try { await reaction.fetch(); } catch { return; }
        }

        const message = reaction.message;
        const guildId = message.guild?.id;
        if (!guildId) return;

        const guild = await GuildModel.findOne({ where: { externalId: guildId } });
        if (!guild) return;

        const guildConfig = await GuildConfigModel.findOne({ where: { guildId: guild.id, name: ReactionRolesConfigName } });
        if (!guildConfig) return;

        const config = guildConfig.value as ReactionRolesConfig;
        const panel: Panel | undefined = (config.panels || []).find((p: Panel) => p.messageId === message.id);
        if (!panel) return;

        const normalized = normalizeEmoji(reaction.emoji);
        const direct = panel.reactions[normalized];
        const fallbackKey = Object.keys(panel.reactions).find(k => normalizeEmoji(k) === normalized);
        const roleId = direct || (fallbackKey ? panel.reactions[fallbackKey] : null);
        if (!roleId) {
            await reaction.users.remove(user.id).catch((err) => console.debug('ReactionRoles: prune user reaction failed', err));

            return;
        }

        if (!message.guild) return;
        const member = await message.guild.members.fetch(user.id);
        if (!member) return;

        if (!member.roles.cache.has(roleId)) {
            await member.roles.add(roleId).catch((err) => console.debug('ReactionRoles: add role failed', err));
        }
    } catch (e) {
        console.error('ReactionAdd handler error:', e);
    }
}

