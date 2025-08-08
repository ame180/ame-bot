import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { events } from '../events';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
    ],
    partials: [
        Partials.Message,
        Partials.Reaction,
        Partials.User,
    ]
});

for (const event of events) {
    if (event.once) {
        client.once(event.name, async (...args) => {
            try {
                await event.execute(...args);
            } catch (error) {
                console.error(error);
            }
        });
    } else {
        client.on(event.name, async (...args) => {
            try {
                await event.execute(...args);
            } catch (error) {
                console.error(error);
            }
        });
    }
}

export { client };