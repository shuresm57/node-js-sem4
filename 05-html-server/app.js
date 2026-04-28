// const express = require('express')
import express from 'express';

import path from 'path';

// Dont use this style anymore, add type module to package.json
// const commonjscookiesUtil = require('./util/commonjscookiesUtil.js')
// console.log(cookiesUtil.getCookie());

// this is the required way henceforth
// never any other way >:(
// if no curly braces, it will fail on no default function
import { esModuleCookieFactory } from './util/esModuleCookiesUtil.js';
const app = express();

// this is needed in order to serve static file
app.use(express.static('public'));
console.log(esModuleCookieFactory());

// only use path.resolve from now on
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/frontpage/frontpage.html'));
});

app.get('/cookieFactory', (req, res) => {
  res.sendFile(path.resolve('public/cookieFactory/cookieFactory.html'));
});

app.get('/redirection', (req, res) => {
  res.sendFile(path.resolve('public/redirection/redirection.html'));
});

// listen
app.listen(8080, (error) => {
  if (error) {
    console.log('Error starting the server');
    return;
  }
  console.log('Server is running on port', 8080);
});
