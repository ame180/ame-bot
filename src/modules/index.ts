import * as main from './main';
import * as levels from './levels';
import * as messageReaction from './messageReactions';

export const globalCommands = {
    ...main.commands,
}

export const guildCommands = {
    levelCommands: levels.commands
}

export const eventHandlers = [
    ...levels.eventHandlers,
    ...messageReaction.eventHandlers
];