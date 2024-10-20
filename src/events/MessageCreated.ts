import { handle as handleXp } from '../services/MessageXpHandler.js';
import {Events} from "discord.js";

export const name = Events.MessageCreate;
export async function execute(message) {
    await handleXp(message);
}