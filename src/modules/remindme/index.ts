import * as remindme from './commands/Remindme';
import { startReminderService } from './ReminderService';

export const name = 'remindme';

export const commands = {
    remindme,
}

export async function setup(client) {
    startReminderService(client);
}