import express from 'express';
import config from 'config';
import connectDb from './utils/connect';
import log from './utils/logger';
import routes from './routes/routes';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = config.get<number>('port') || 5000;
app.listen(PORT, async () => {
    log.info(`Server Listening in http://localhost:${PORT}`);
    await connectDb();
    routes(app);
});
