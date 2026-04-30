import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { generalLimiter, authLimiter } from './middleware/rateLimiter.js';
import authRouter from './routers/authRouter.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use(generalLimiter);
app.use(authLimiter, '/api/auth');

app.use(authRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log('The server is running at', PORT);
});
