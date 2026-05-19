import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import pagesRouter from './routers/pagesRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(pagesRouter);

if (!process.env.VERCEL) {
  app.listen(8080, (error) => {
    if (error) {
      console.log('Could not start the server on', 8080);
    }

    console.log('Server running on ', 8080);
  });
}

export default app;
