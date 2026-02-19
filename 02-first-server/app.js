// import express
const express = require('express');
// instantiate express
const app = express();
// parse the req.body
app.use(express.json());



// path must be absolute, cannot be relative
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/xss', (req, res) => {
  res.sendFile(__dirname + '/xss.html')
});

app.get('/snowstorms', (req, res) => {
  res.send({ warning: 'snestorm kl 12!!!!' });
});

app.get('/proxy', (req, res) => {
  //assignment: create a proxy to https://google.com/'

  // fetch('https://google.com')
  // .then((response) => response.text())
  // .then(result => {
  //   res.send(result)
  // })

  

})

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


app.post('/dinosaurs', (req, res) => {
  console.log(req.body)
  res.send({ data : req.body })
})

// assignment : create a POST route with the endpoint /energydrinks that adds energydrinks to an array

const energyDrinks = []

app.post('/energy-drinks', (req, res) => {
  energyDrinks.push(req.body);
  res.send(req.body);
  console.log(energyDrinks);
})

app.listen(8080);