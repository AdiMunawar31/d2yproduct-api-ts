import express, { Request, Response } from 'express';
import dotenv from "dotenv";
dotenv.config();
import config from 'config';
import connectDb from './utils/connect';
import log from './utils/logger';
import routes from './routes/routes';
import responseTime from "response-time";
import deserializeUser from './middleware/deserializeUser';
import { restResponseTimeHistogram } from './utils/metrics';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(deserializeUser);

app.use(
    responseTime((req: Request, res: Response, time: number) => {
        if (req?.route?.path) {
            restResponseTimeHistogram.observe(
                {
                    method: req.method,
                    route: req.route.path,
                    status_code: res.statusCode,
                },
                time * 1000
            );
        }
    })
);

const PORT = config.get<number>('port') || 5000;
app.listen(PORT, async () => {
    log.info(`Server Listening in http://localhost:${PORT}`);
    await connectDb();
    routes(app);
});
