import { Events } from 'discord.js';
import { globalCommands } from '../modules';
import { getGuildCommands } from '../modules/GuildCommandsResolver';
import { GuildModel } from '../models';

export const name = Events.InteractionCreate;
export async function execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const guild = await GuildModel.findOne({
        where: {
            externalId: interaction.guild.id
        }
    });
    if (!guild) {
        console.error(`Guild ${interaction.guild.id} not found in database.`);
        interaction.reply({ content: 'This guild is not registered!', ephemeral: true });
        return;
    }

    const commands = {
        ...globalCommands,
        ...await getGuildCommands(guild),
    };

    const command = commands[interaction.commandName];

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