import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public'));

app.get('/', (req,res) => {
  res.sendFile(path.resolve('public/frontpage/frontpage'));
});

app.get('/week-1', (req,res) => {
  res.sendFile(path.resolve('public/documentation/week-1'));
});

app.get('/week-2', (req,res) => {
  res.sendFile(path.resolve('public/documentation/week-2'));
});

app.get('/week-3', (req,res) => {
  res.sendFile(path.resolve('public/documentation/week-3'));
});

app.get('/week-4', (req,res) => {
  res.sendFile(path.resolve('public/documentation/week-4'));
});

app.get('/week-5', (req,res) => {
  res.sendFile(path.resolve('public/documentation/week-5'));
});

app.get('/week-6', (req,res) => {
  res.sendFile(path.resolve('public/documentation/week-6'));
});

app.listen(8080, (error) => {
  if (error) {
    console.log('Could not start the server on', 8080);
  };

  console.log('Server running on ', 8080);
});
