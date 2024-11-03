import {Client, GatewayIntentBits} from 'discord.js';
import { commands } from "../commands";
import { events } from "../events";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
]});

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

export { client, commands };