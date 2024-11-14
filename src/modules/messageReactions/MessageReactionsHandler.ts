import { GuildConfigModel, GuildModel } from '../../models';
import { Events } from 'discord.js';

export const MessageReactionConfigName = 'messageReactions';

export type MessageReactionConfigRules = {
    messageRegex: string,
    reaction: string
}

export type MessageReactionConfig = {
    rules: MessageReactionConfigRules[]
}

export const eventName = Events.MessageCreate;

export async function handle(message) {
    if (message.author.bot) return;

    const guildConfig = await GuildConfigModel.findOne({
        where: {
            name: MessageReactionConfigName
        },
        include: {
            model: GuildModel,
            where: {
                externalId: message.guild.id
            }
        }
    });
    if (!guildConfig) return;

    const config: MessageReactionConfig = guildConfig.value;
    for (const rule of config.rules) {
        if (new RegExp(rule.messageRegex).test(message.content)) {
            await message.react(rule.reaction);
        }
    }
}