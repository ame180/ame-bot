import * as main from './main';
import * as levels from './levels';
import * as messageReaction from './messageReactions';
import * as targetedGifs from './targetedGifs';
import * as remindme from './remindme';
import * as reactionRoles from './reactionRoles';

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
    [reactionRoles.name]: reactionRoles.eventHandlers,
};

export async function runModuleSetups() {
    const setups: { [key: string]: () => Promise<void> | void } = {
        [remindme.name]: remindme.setup,
        [reactionRoles.name]: reactionRoles.setup,
    };

    for (const [moduleName, fn] of Object.entries(setups)) {
        try {
            await fn();
            console.log(`[modules] setup complete for ${moduleName}`);
        } catch (err) {
            console.error(`[modules] setup failed for ${moduleName}`, err);
        }
    }
}