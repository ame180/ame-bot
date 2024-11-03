import { Events } from "discord.js";
import { eventHandlers } from "../modules";

export const name = Events.MessageCreate;

export async function execute(message) {
    for (const handler of eventHandlers) {
        if (!handler.eventName || handler.eventName !== name) continue;
        await handler.handle(message);
    }
}