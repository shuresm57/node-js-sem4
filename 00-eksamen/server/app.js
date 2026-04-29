import express from 'express';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT ?? 8080;

app.listen(PORT);
