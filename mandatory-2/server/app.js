import dotenv from 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

// =============
// CORS       ||
// =============

import cors from 'cors';

// ================
// RATE LIMITERS ||
// ================

import { rateLimit } from 'express-rate-limit';

//= ==========
// ROUTERS ||
//= ==========

import authRouter from './routers/authRouter.js';

const app = express();
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});

app.use('/api/auth', authLimiter);

app.use(authRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`The server is running at ${PORT}`);
});
