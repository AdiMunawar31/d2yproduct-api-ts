import express from 'express';
import config from 'config';
import connectDb from './utils/connect';

const app = express()

const PORT = config.get<number>('port') || 5000;
app.listen(PORT, async () => {
    console.log(`🔥Server Listening in http://localhost:${PORT}`);
    await connectDb();
});
