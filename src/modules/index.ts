import * as main from './main';
import * as levels from './levels';
import * as messageReaction from './messageReactions';

export const commands = {
    ...main.commands,
    ...levels.commands,
}

export const eventHandlers = [
    ...levels.eventHandlers,
    ...messageReaction.eventHandlers
];