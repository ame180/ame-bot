import * as main from './main';
import * as levels from './levels';
import * as messageReaction from './messageReactions';

export const globalCommands = {
    ...main.commands,
}

export const guildCommands = {
    [levels.name]: levels.commands
}

export const globalEventHandlers = []

export const moduleEventHandlers = {
    [levels.name]: levels.eventHandlers,
    [messageReaction.name]: messageReaction.eventHandlers,
};