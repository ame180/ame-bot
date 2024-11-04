import * as level from "./commands/Level";
import * as xp from "./commands/Xp";
import * as leaderboard from "./commands/Leaderboard";
import * as messageXpHandler from './MessageXpHandler';

export const name = 'levels';

export const commands = {
    level,
    xp,
    leaderboard,
}

export const eventHandlers = [
    messageXpHandler,
]