import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { events } from "../events";
import { commands } from "../modules";
import { DISCORD_API_VERSION, DISCORD_CLIENT_ID, DISCORD_TOKEN } from "../config";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
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

const commandsData = Object.values(commands).map((command) => command.data);
const count = commandsData.length;

const rest = new REST({ version: DISCORD_API_VERSION }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${count} application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),
            {
                body: commandsData
            },
        );

        console.log(`Successfully reloaded ${count} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

export { client };