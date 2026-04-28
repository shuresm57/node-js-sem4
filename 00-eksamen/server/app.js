import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { generalLimiter } from './middleware/rateLimiters.js';

//
// ROUTERS
//

import authRouter from './routers/authRouter.js';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(helmet());
app.use(generalLimiter);
app.use(authRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
