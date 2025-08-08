import { Events, MessageReaction, PartialMessageReaction, PartialUser, User } from 'discord.js';
import { globalEventHandlers, moduleEventHandlers } from '../modules';
import { getEnabledGuildModules } from '../modules/GuildModulesResolver';
import { GuildModel } from '../models';

export const name = Events.MessageReactionAdd;

export async function execute(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) {
    const enabledEventHandlers = [...globalEventHandlers];

    const guildId = reaction.message.guildId || reaction.message.guild?.id;
    if (!guildId) return;

    const guild = await GuildModel.findOne({ where: { externalId: guildId } });
    if (!guild) return;

    const modules = await getEnabledGuildModules(guild);
    for (const module of modules) {
        const currentModuleEventHandlers = moduleEventHandlers[module];
        if (!currentModuleEventHandlers) continue;
        enabledEventHandlers.push(...currentModuleEventHandlers);
    }

    const currentEventHandlers = enabledEventHandlers.filter(handler => handler.eventName === name);
    for (const handler of currentEventHandlers) {
        await handler.handle(reaction, user);
    }
}
