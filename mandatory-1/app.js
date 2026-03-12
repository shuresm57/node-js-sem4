import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public', {
  extensions: ['html']
}));

app.get('/', (req,res) => {
  res.sendFile(path.resolve('public/pages/frontpage.html'));
});

app.get('/week-1', (req,res) => {
  res.sendFile(path.resolve('public/pages/week-1.html'));
});

app.get('/week-2', (req,res) => {
  res.sendFile(path.resolve('public/pages/week-2.html'));
});

app.get('/week-3', (req,res) => {
  res.sendFile(path.resolve('public/pages/week-3.html'));
});

app.get('/week-4', (req,res) => {
  res.sendFile(path.resolve('public/pages/week-4.html'));
});

app.get('/week-5', (req,res) => {
  res.sendFile(path.resolve('public/pages/week-5.html'));
});

app.get('/week-6', (req,res) => {
  res.sendFile(path.resolve('public/pages/week-6.html'));
});

app.listen(8080, (error) => {
  if (error) {
    console.log('Could not start the server on', 8080);
  };

  console.log('Server running on ', 8080);
});
