import { Events } from "discord.js";
import { globalEventHandlers, moduleEventHandlers } from "../modules";
import { getEnabledGuildModules } from "../modules/GuildModulesResolver";

export const name = Events.MessageCreate;

export async function execute(message) {
    const enabledEventHandlers = [...globalEventHandlers];

    const modules = await getEnabledGuildModules(message.guildId);
    for (const module of modules)
    {
        const currentModuleEventHandlers = moduleEventHandlers[module];

        if (!currentModuleEventHandlers) continue;

        enabledEventHandlers.push(...currentModuleEventHandlers);
    }

    const currentEventHandlers = enabledEventHandlers.filter(handler => handler.eventName === name);

    for (const handler of currentEventHandlers) {
        await handler.handle(message);
    }
}