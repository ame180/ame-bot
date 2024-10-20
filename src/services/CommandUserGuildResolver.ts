import { User as DiscordUser, CommandInteraction } from "discord.js";
import { UserModel, UserGuildModel } from "../models";

/**
 * Returns the UserGuild for the user in the interaction and whether the targetUser
 *
 * @param interaction
 */
export async function getCommandUserGuild(interaction: CommandInteraction): Promise<[typeof UserGuildModel|null, DiscordUser|null]> {
    const targetUser = interaction.options.get('user')?.user;
    const userExternalId = targetUser ? targetUser.id : interaction.user.id;
    const userGuild = await UserGuildModel.findOne({
        where: {
            externalId: interaction.guildId
        },
        include: {
            model: UserModel,
            where: { externalId: userExternalId }
        }
    });

    return [
        userGuild,
        targetUser
    ];
}