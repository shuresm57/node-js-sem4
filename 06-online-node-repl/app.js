import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public'));
app.use(express.json());

// ====================== PAGES ==============================

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/pages/frontend/frontend.html'));
})

app.get('/pages/about', (req, res) => {
  res.sendFile(path.resolve('public/pages/about/about.html'));
})

// ====================== API ==============================

import replRouter from './routers/replRouter.js';

app.use(replRouter);

// this is the process node runs from
// console.log(process)

// don't use magic variables, use config variables
// Short circuit syntax
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
  if (error) {
    // we can call on the return value for the const server, not correct to use, but most truthful
    console.log('Could not start the server on', error.message);
  };

  console.log('Server running on ', PORT);
});
