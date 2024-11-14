import express from 'express';
import controllers from './controllers';

const app = express();
const port = 3000;

app.use(controllers);

app.listen(port, () => {
    console.log(app._router.stack);
    console.log(`[server]: Server is running at http://localhost:${port}`);
});