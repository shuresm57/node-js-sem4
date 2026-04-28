import express from 'express';
// TODO Create pagesutil

// ====================== PAGES ==============================

import pagesRouter from './routers/pagesRouter.js';

// ====================== API ==============================

import replRouter from './routers/replRouter.js';

import contactRouter from './routers/contactRouter.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(pagesRouter);
app.use(replRouter);
app.use(contactRouter);

// this is the process node runs from
// console.log(process)

// don't use magic variables, use config variables
// Short circuit syntax
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
  if (error) {
    // we can call on the return value for the const server, not correct to use, but most truthful
    console.log('Could not start the server on', error.message);
  }

  console.log('Server running on ', PORT);
});
