import * as main from './main';
import * as levels from './levels';
import * as messageReaction from './messageReactions';
import * as targetedGifs from './targetedGifs';

export const globalCommands = {
    ...main.commands,
}

export async function getGuildCommands(guildId: string) {
    return {
        [levels.name]: levels.commands,
        [targetedGifs.name]: await targetedGifs.getGuildCommands(guildId),
    }
}

export const globalEventHandlers = []

export const moduleEventHandlers = {
    [levels.name]: levels.eventHandlers,
    [messageReaction.name]: messageReaction.eventHandlers,
};