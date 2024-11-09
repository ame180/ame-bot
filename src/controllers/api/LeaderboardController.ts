import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel, UserGuildModel } from '../../models';
import { calculateLevel } from '../../services/LevelCalculator';

const router = express.Router();

router.get('/leaderboard/:guildId', asyncHandler(async (req: Request, res: Response) => {
    const guildId = req.params.guildId;
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
                    level: calculateLevel(userGuild.xp).level,
                    messageCount: userGuild.messageCount
                }
            }
        )
    ));
}));

export default router;