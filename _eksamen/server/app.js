import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';


import { generalLimiter } from './middleware/rateLimiters.js';

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(helmet());
app.use(generalLimiter);

//
// ROUTERS
//

import authRouter from './routers/authRouter.js';
app.use(authRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, (error) => {
  if (error) {
    console.log('Error starting the server');
    return;
  }
  console.log('Server running at ', PORT);
});
