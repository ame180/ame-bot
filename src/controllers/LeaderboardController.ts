import { UserModel, UserGuildModel } from '../models';
import { Response } from "express";

export default {
    async getLeaderboard(res: Response, guildId: string) {
        const userGuilds = await UserGuildModel.findAll({
            where: {
                externalId: guildId
            },
            include: [
                {
                    model: UserModel,
                    required: true
                }
            ]
        });

        res.send(userGuilds.map(
            (userGuild: typeof UserGuildModel) => userGuild.toJSON()
        ));
    }
}