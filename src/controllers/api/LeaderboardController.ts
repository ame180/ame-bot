import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel, UserGuildModel, connection } from '../../models';
import { calculateLevel } from '../../services/LevelCalculator';
import { name as LEVELS_MODULE_NAME } from "../../modules/levels";
import { QueryTypes } from "sequelize";

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

router.get('/leaderboards', asyncHandler(async (req: Request, res: Response) => {
    if (req.header('x-api-key') !== process.env.API_KEY) {
        res.status(401).send('Unauthorized');
        return;
    }

    const guildsModuleConfigs = await connection.query(
        'SELECT DISTINCT guildId, value FROM GuildConfigs WHERE name = "modules"',
        {
            type: QueryTypes.SELECT
        }
    );
    const guildsWithLevels = guildsModuleConfigs.filter(
        (guildModuleConfig: any) => {
            return guildModuleConfig.value[LEVELS_MODULE_NAME];
        }
    );

    res.send(guildsWithLevels.map((guildsModuleConfig: any) => guildsModuleConfig.guildId));
}));

export default router;