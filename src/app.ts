import express from 'express';
import config from 'config';

const app = express()

const PORT = config.get<string>('port');
app.listen(PORT, () => console.log(`🔥Server Listening in http://localhost:${PORT}`));
