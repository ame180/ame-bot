import { Events } from "discord.js";
import { commands } from "../commands";

export const name = Events.InteractionCreate;
export async function execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = commands[interaction.commandName as keyof typeof commands];

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}