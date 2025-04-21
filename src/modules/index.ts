import * as main from './main';
import * as levels from './levels';
import * as messageReaction from './messageReactions';
import * as targetedGifs from './targetedGifs';
import * as remindme from './remindme';

export const globalCommands = {
    ...main.commands,
}

export async function getGuildCommands(guild) {
    return {
        [levels.name]: levels.commands,
        [targetedGifs.name]: await targetedGifs.getGuildCommands(guild),
        [remindme.name]: remindme.commands,
    }
}

export const globalEventHandlers = []

export const moduleEventHandlers = {
    [levels.name]: levels.eventHandlers,
    [messageReaction.name]: messageReaction.eventHandlers,
};