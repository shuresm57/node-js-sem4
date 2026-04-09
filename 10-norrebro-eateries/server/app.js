import 'dotenv/config';

import express from 'express';

import restaurantsRouter from './routers/restaurantsRouter.js';
import visitorsRouter from './routers/visitorsRouter.js';

const app = express();

// auto CORS

import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// manual CORS

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

import session from 'express-session';

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
