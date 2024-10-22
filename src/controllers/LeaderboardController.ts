import { UserModel, UserGuildModel } from '../models';
import { Response } from "express";
import { calculateLevel } from '../services/LevelCalculator';

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

        res.send(await Promise.all(
            userGuilds.map(
                async (userGuild: typeof UserGuildModel) => {
                    const user = await userGuild.getUser();
                    return {
                        id: user.externalId,
                        username: user.username,
                        avatarUrl: user.avatar,
                        displayName: user.displayName,
                        userGuildDisplayName: userGuild.userDisplayName,
                        xp: userGuild.xp,
                        level: calculateLevel(userGuild.xp).level
                    }
                }
            )
        ));
    }
}