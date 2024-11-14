import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel, UserGuildModel, connection } from '../../models';
import { calculateLevel } from '../../services/LevelCalculator';
import { name as LEVELS_MODULE_NAME } from '../../modules/levels';
import { QueryTypes } from 'sequelize';
import slugify from 'slugify';
import { API_KEY } from '../../config';
import { APP_HOST, APP_PROTOCOL } from "../../config";
import { url } from "../../utils/urls";

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
    if (req.header('x-api-key') !== API_KEY) {
        res.status(401).send('Unauthorized');
        return;
    }

    const guildsWithModules = await connection.query(
        'SELECT DISTINCT g.externalId, g.name, g.updatedAt, value AS modules FROM Guilds g INNER JOIN GuildConfigs gc ON gc.guildId = g.id WHERE gc.name = "modules"',
        {
            type: QueryTypes.SELECT
        }
    );
    const guildsWithLevels = guildsWithModules.filter(
        (guildModuleConfig: any) => {
            return guildModuleConfig.modules[LEVELS_MODULE_NAME];
        }
    );

    res.send(guildsWithLevels.map((guildsModuleConfig: any) => {
        return {
            id: guildsModuleConfig.externalId,
            name: guildsModuleConfig.name,
            slug: slugify(guildsModuleConfig.name, { lower: true }),
            updatedAt: guildsModuleConfig.updatedAt,
            leaderboardUrl: url(`/api/leaderboard/${guildsModuleConfig.externalId}`)
        }
    }));
}));

export default router;