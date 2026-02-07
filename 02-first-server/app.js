// import express
const express = require('express');
// instantiate express
const app = express();

app.get('/', (req, res) => {
  res.send({ data: 'Welcome to min minecraft server!' });
});

app.get('/snowstorm', (req, res) => {
  res.send({ data: 'snestorm kl 12!!!!' });
});

// how can we send data in a GET request?

// path variable
app.get('/cars/:carModel', (req, res) => {
  console.log(req.params);
  res.send({ data: `Your ${req.params.carModel} is very nice` });
});

app.get('/cars/:carModel/:year', (req, res) => {
  console.log(req.params);
  res.send({
    data: `Your ${req.params.carModel} from the year ${req.params.year} is very nice`,
  });
});

// query string / query parameters
app.get('/bag', (req, res) => {
  res.send({ data: req.query });
});

app.listen(8080);