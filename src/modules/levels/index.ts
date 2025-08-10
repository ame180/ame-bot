import * as level from './commands/Level';
import * as leaderboard from './commands/Leaderboard';
import * as messageXpHandler from './MessageXpHandler';

export const name = 'levels';

export const commands = {
    level,
    leaderboard,
}

export const eventHandlers = [
    messageXpHandler,
]