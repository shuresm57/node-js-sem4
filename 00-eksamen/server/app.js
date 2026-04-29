import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT);
