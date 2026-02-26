import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.sendFile(path.resolve('public/frontpage/frontpage.html'));
});

app.get('/week-1', (req,res) => {
    res.sendFile(path.resolve('public/week-1/week-1.html'));
});


app.listen(8080, (error) => {
  if (error) {
    console.log('Could not start the server on', 8080);
  };

  console.log('Server running on ', 8080);
});

