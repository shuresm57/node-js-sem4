import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public'));
app.use(express.json());

// ====================== PAGES ==============================


import fs from 'fs';

// SSR is great because of SEO
// also because of speed
// also rendering runs on the server
//const frontpage = fs.readFileSync('./public/pages/frontend/frontend.html', 'utf-8');
const frontpagePage = fs.readFileSync('./public/pages/frontend/frontend.html').toString();
const aboutPage = fs.readFileSync('./public/pages/about/about.html').toString();
app.get('/', (req, res) => {
  res.send(frontpagePage);
})

app.get('/pages/about', (req, res) => {
  res.send(aboutPage);
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
