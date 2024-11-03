import { GuildConfigModel } from "../models";

export const MessageReactionConfigName = 'messageReactions';

export type MessageReactionConfigRules = {
    messageRegex: string,
    reaction: string
}

export type MessageReactionConfig = {
    rules: MessageReactionConfigRules[]
}

export async function handle(message) {
    if (message.author.bot) return;

    const guildConfig = await GuildConfigModel.findOne({
        where: {
            guildId: message.guild.id,
            name: MessageReactionConfigName
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