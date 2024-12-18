import { GuildConfigModel, GuildModel } from '../../models';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { getRandomElement } from '../../utils/random';

export const TargetedGifsConfigName = 'targetedGifs';

export type TargetedGifsConfigCommandConfigs = {
    name: string,
    description: string|undefined,
    userName: string|undefined,
    userDescription: string|undefined,
    response: string,
    gifs: string[]
}

export type TargetedGifsConfig = {
    gifCommands: TargetedGifsConfigCommandConfigs[]
}

async function handleTargetedGifCommand(interaction, commandConfig: TargetedGifsConfigCommandConfigs) {
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

    const commands = await getCommands(guild);
    const command = commands[interaction.commandName];
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    let response = commandConfig.response;
    response = response.replace('${USER}', interaction.user.toString());
    response = response.replace('${TARGET}', interaction.options.getUser(commandConfig.userName || 'user').toString());

    const gifs = commandConfig.gifs;
    const gif = getRandomElement(gifs);

    const embed = new EmbedBuilder()
        .setDescription(response)
        .setImage(gif)
        .setTimestamp();

    interaction.reply({
        embeds: [embed]
    })
}

export async function getCommands(guild) {
    const guildConfig = await GuildConfigModel.findOne({
        where: {
            guildId: guild.id,
            name: TargetedGifsConfigName
        },
    });
    if (!guildConfig) return {};

    const config: TargetedGifsConfig = guildConfig.value;
    const commands = {};
    for (const commandConfig of config.gifCommands)
    {
        const commandData = new SlashCommandBuilder()
                .setName(commandConfig.name)
                .setDescription(commandConfig.description || commandConfig.name)
                .addUserOption(option =>
                    option.setName(commandConfig.userName || 'user')
                        .setDescription(commandConfig.description || `Select a user to ${commandConfig.name}`)
                        .setRequired(true))
        commands[commandConfig.name] = {
            data: commandData,
            execute: (interaction) => handleTargetedGifCommand(interaction, commandConfig)
        };
    }

    return commands;
}