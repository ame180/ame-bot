import { REST, Routes } from 'discord.js';
require('dotenv').config();
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
import { commands } from './commands';

const commandsData = Object.values(commands).map((command) => command.data);

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Started refreshing application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(DISCORD_CLIENT_ID),
            {
                body: commandsData
            },
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();