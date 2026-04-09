import dotenv from 'dotenv/config'
// also possible, this way i can set options
// for example different paths or custom env file names
//dotenv.config()


import express from 'express';
const app = express()

import { rateLimit } from 'express-rate-limit';

const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
}); 

app.use(generalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minuts
  limit: 5,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
})

app.use('/auth', authLimiter);

import helmet from 'helmet';
app.use(helmet());

import session from 'express-session';

app.use(session({
  secret: process.env.SESSION_SECRET, // TODO: Make sure not to push this
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));



import middlewareRouter from './routers/middlewareRouter.js';
app.use(middlewareRouter);

import authRouter from './routers/authRouter.js';
app.use(authRouter);

import sessionRouter from './routers/sessionRouter.js';
app.use(sessionRouter);

// {*splat} is the new syntax in Express 5.x, before it was just /*
app.get('/{*splat}', (req, res) => {
  res.send(`
    <div>
      <h1>404</h1>
      <h3>Page ${req.path} doesn't exist</h3>
    </div>
    `);
})

app.all('{*splat}', (req, res) => {
  res.send({ errorMessage: 'The route does not exist' });
})

// Nullish coaelescing = ??
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log('Server is running at', PORT);
});
