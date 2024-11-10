import { Events } from "discord.js";
import { globalEventHandlers, moduleEventHandlers } from "../modules";
import { getEnabledGuildModules } from "../modules/GuildModulesResolver";
import {GuildModel} from "../models";

export const name = Events.MessageCreate;

export async function execute(message) {
    const enabledEventHandlers = [...globalEventHandlers];

    const guild = await GuildModel.findOne({
        where: {
            externalId: message.guildId
        }
    });
    if (!guild) return;

    const modules = await getEnabledGuildModules(guild);
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