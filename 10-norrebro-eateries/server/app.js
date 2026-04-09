import 'dotenv/config';

import express from 'express';

import session from 'express-session';

import restaurantsRouter from './routers/restaurantsRouter.js';
import visitorsRouter from './routers/visitorsRouter.js';

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use(restaurantsRouter);
app.use(visitorsRouter);
const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log('Server is running at', PORT);
});
