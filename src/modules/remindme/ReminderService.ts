import { ReminderModel } from '../../models';
import type { Client } from 'discord.js';
import { isGuildModuleEnabled } from '../GuildModulesResolver';
import { name as remindmeModuleName } from './index';

let reminderCheckInterval = null;

export function startReminderService(client: Client) {
    if (reminderCheckInterval) {
        return;
    }

    // Check for reminders every 10 seconds
    reminderCheckInterval = setInterval(() => checkReminders(client), 10000);
    console.log('Reminder service started');
}

export function stopReminderService() {
    if (reminderCheckInterval) {
        clearInterval(reminderCheckInterval);
        reminderCheckInterval = null;
        console.log('Reminder service stopped');
    }
}

async function checkReminders(client: Client) {
    const now = new Date();

    // Find all reminders that are due and not completed
    const dueReminders = await ReminderModel.findAll({
        where: {
            pingTime: {
                [Symbol.for('lte')]: now
            },
            completed: false
        },
        include: [
            { association: 'Guild' },
            { association: 'User' }
        ]
    });

    if (dueReminders.length > 0) {
        console.log(`Processing ${dueReminders.length} due reminders`);
    }

    for (const reminder of dueReminders) {
        try {
            // Check if the module is enabled for this guild
            const isModuleEnabled = await isGuildModuleEnabled(reminder.Guild, remindmeModuleName);
            if (!isModuleEnabled) {
                console.log(`Skipping reminder ${reminder.id} - module disabled for guild ${reminder.Guild.externalId}`);
                // Mark as completed since the module is disabled
                reminder.completed = true;
                await reminder.save();

                continue;
            }

            const guild = client.guilds.cache.get(reminder.Guild.externalId);
            if (!guild) {
                console.error(`Guild ${reminder.Guild.externalId} not found for reminder ${reminder.id}`);

                continue;
            }

            const channel = guild.channels.cache.get(reminder.channelId);
            if (!channel || !channel.isTextBased()) {
                console.error(`Channel ${reminder.channelId} not found or not text-based for reminder ${reminder.id}`);

                continue;
            }

            // Format the message
            let message = `<@${reminder.User.externalId}> Here's your reminder!`;
            if (reminder.message) {
                message += ` "${reminder.message}"`;
            }

            let delivered = false;
            if (reminder.sendAsDM) {
                try {
                    const user = await client.users.fetch(reminder.User.externalId);
                    await user.send(message);
                    delivered = true;
                } catch (e) {
                    console.debug(`Could not DM user ${reminder.User.externalId} for reminder ${reminder.id} (likely DMs disabled):`, e);
                }
            }

            if (!delivered) {
                await channel.send(message);
            }

            // Mark reminder as completed
            reminder.completed = true;
            await reminder.save();

            console.log(`Sent reminder ${reminder.id} to user ${reminder.User.externalId}`);
        } catch (error) {
            console.error(`Error processing reminder ${reminder.id}:`, error);
        }
    }
}