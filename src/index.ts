import express, {Express, NextFunction, Request, Response} from "express";
import { LeaderboardController } from "./controllers";

const app: Express = express();
const port = 3000;

const apiRouter = express.Router();
apiRouter.get('/leaderboard/:guildId', (req: Request, res: Response, next: NextFunction) => {
    LeaderboardController.getLeaderboard(res, req.params.guildId)
        .then()
        .catch((err) => {
            next(err);
        });
});
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});