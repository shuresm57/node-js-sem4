import dotenv from 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

// =============
// CORS       ||
// =============

import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// ================
// HELMET        ||
// ================

import helmet from 'helmet';

app.use(helmet());

// ================
// RATE LIMITERS ||
// ================

import { rateLimit } from 'express-rate-limit';

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

app.use(generalLimiter);
//app.use('/api', authLimiter);

// =============
// ROUTERS    ||
// =============

import authRouter from './routers/authRouter.js';

app.use(authRouter);


const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
