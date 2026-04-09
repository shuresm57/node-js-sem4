import 'dotenv/config';

import express from 'express';

import restaurantsRouter from './routers/restaurantsRouter.js';
import visitorsRouter from './routers/visitorsRouter.js';

import path from 'path';

import session from 'express-session';

const app = express();
app.use(express.static('../client/dist'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(restaurantsRouter);
app.use(visitorsRouter);

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve('../client/dist/index.html'));
});

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log('Server is running at', PORT);
});
