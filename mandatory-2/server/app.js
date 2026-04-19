import dotenv from 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';

// =============
// CORS       ||
// =============

import cors from 'cors';

// ================
// HELMET        ||
// ================

import helmet from 'helmet';

// ================
// RATE LIMITERS ||
// ================

import { rateLimit } from 'express-rate-limit';
// app.use('/api', authLimiter);

// =============
// ROUTERS    ||
// =============

import authRouter from './routers/authRouter.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(helmet());

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

app.use(authRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
