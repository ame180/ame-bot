import { Guild } from "discord.js";
import {GuildModel} from "../models";


export async function updateGuilds(guilds) {
    for (const guild of guilds) {
        const [guildModel, created] = await GuildModel.findOrCreate({
            where: {
                externalId: guild.id
            },
            defaults: {
                name: guild.name
            }
        });

        if (created) {
            guildModel.save().then(
                () => console.log(`Created guild ${guild.name} (${guild.id})`)
            );

            continue;
        }

        if (guildModel.name !== guild.name) {
            guildModel.name = guild.name;
            guildModel.save().then(
                () => console.log(`Updated guild ${guild.name} (${guild.id})`)
            );
        }
    }
}