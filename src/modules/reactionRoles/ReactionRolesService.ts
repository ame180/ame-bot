import { GuildConfigModel, GuildModel } from '../../models';
import type { Message } from 'discord.js';
import { client } from '../../services/ClientProvider';
import { isGuildModuleEnabled } from '../GuildModulesResolver';

export const ReactionRolesConfigName = 'reactionRoles';

export type Panel = {
    key: string,
    channelId: string,
    messageId?: string,
    content: string,
    reactions: { [emoji: string]: string },
    removeOnUnreact?: boolean,
}

export type ReactionRolesConfig = {
    panels: Panel[]
}

export async function syncAllEnabledGuilds() {
    const guilds = client.guilds.cache.map(g => g.id);
    for (const guildId of guilds) {
        const guild = await GuildModel.findOne({ where: { externalId: guildId } });
        if (!guild) continue;
        const enabled = await isGuildModuleEnabled(guild, 'reactionRoles');
        if (!enabled) continue;
        await syncGuildPanels(guild);
    }
}

export async function syncGuildPanels(guild) {
    const guildConfig = await GuildConfigModel.findOne({
        where: { guildId: guild.id, name: ReactionRolesConfigName }
    });
    if (!guildConfig) return;

    const config: ReactionRolesConfig = guildConfig.value;
    const panels = config.panels || [];

    for (const panel of panels) {
        try {
            const discordGuild = client.guilds.cache.get(guild.externalId);
            if (!discordGuild) continue;
            const channel = discordGuild.channels.cache.get(panel.channelId);
            if (!channel) continue;
            if (!channel.isTextBased()) continue;


            let message: Message | null = null;
            if (panel.messageId) {
                try {
                    const textChannel = channel as any; // channel.isTextBased() ensured
                    message = await textChannel.messages?.fetch(panel.messageId as string) as Message;
                } catch {
                    message = null;
                }
            }

            if (!message) {
                const textChannel = channel as any; // channel.isTextBased() ensured
                message = await textChannel.send(panel.content || '') as Message;
                panel.messageId = message.id;
                await persistConfigMessageId(guildConfig, panel.key, message.id);
            }

            // ensure reactions exist
            for (const emojiKey of Object.keys(panel.reactions)) {
                const hasReaction = message.reactions.cache.some(r => normalizeEmoji(r.emoji) === normalizeEmoji(emojiKey));
                if (!hasReaction) {
                    const reactable = toReactableEmoji(emojiKey);
                    if (!reactable) continue;
                    try {
                        await message.react(reactable);
                    } catch (err) {
                        console.error(`[ReactionRoles] Failed to add reaction: emoji='${reactable}' messageId=${message.id}`, err);
                    }
                }
            }
        } catch (e) {
            console.error('[ReactionRoles] sync error:', e);
        }
    }
}

export type EmojiLike = string | { id?: string | null, name?: string | null };

export function normalizeEmoji(emojiOrString: EmojiLike): string {
    if (!emojiOrString) return '';
    if (typeof emojiOrString === 'string') {
        const key = emojiOrString.trim();
        const mention = key.match(/^<a?:\w+:(\d+)>$/);
        if (mention) return mention[1];
        if (/^\d{10,}$/.test(key)) return key; // custom emoji id string
        return key; // unicode emoji
    }
    const { id, name } = emojiOrString;
    return id || name || '';
}

export function toReactableEmoji(emojiKey: string): string | null {
    if (!emojiKey) return null;
    const key = emojiKey.trim();
    if (!key) return null;
    return key;
}

type GuildConfigValue = { panels: Panel[] };
type GuildConfigRecord = {
    value: GuildConfigValue,
    save: () => Promise<void>,
    set?: (key: string, value: any) => void
};

async function persistConfigMessageId(guildConfig: GuildConfigRecord, panelKey: string, messageId: string) {
    // Root cause: Sequelize did not detect changes to the nested JSON 'value' field, so .save() was a no-op.
    // Fix: Use .set('value', value) and .changed('value', true) to force Sequelize to persist the update.
    const value = guildConfig.value;
    value.panels = (value.panels || []).map((p: Panel) => p.key === panelKey ? { ...p, messageId } : p);
    try {
        if (typeof guildConfig.set === 'function') {
            guildConfig.set('value', value);
            if (typeof (guildConfig as any).changed === 'function') {
                (guildConfig as any).changed('value', true);
            }
        } else {
            (guildConfig as any).value = value;
        }
        await guildConfig.save();
    } catch (err) {
        console.error('[ReactionRoles] persistConfigMessageId: failed to save config', err);
    }
}
