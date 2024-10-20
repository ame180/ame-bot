const { SlashCommandBuilder } = require("discord.js");
const { User, UserGuild } = require('../models/index');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("xp")
        .setDescription("Replies with your current XP!"),
    async execute(interaction) {
        const userGuild = await UserGuild.findOne({
            where: {
                externalId: interaction.guildId
            },
            include: {
                model: User,
                where: { externalId: interaction.user.id }
            }
        });
        if (!userGuild || !userGuild.xp) {
            await interaction.reply("You don't have any XP yet!");
        } else {
            await interaction.reply(`You have ${userGuild.xp} XP!`);
        }
    }
}