import express from 'express';

const app = express();
app.use(express.static('public'));

import pagesRouter from './routers/pagesRouter.js';
app.use(pagesRouter);

app.listen(8080, (error) => {
  if (error) {
    console.log('Could not start the server on', 8080);
  };

  console.log('Server running on ', 8080);
});
