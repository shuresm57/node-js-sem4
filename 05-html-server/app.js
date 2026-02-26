const express = require('express')
const app = express()

// this is needed in order to serve static file
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/frontpage/frontpage.html');
});

// listen
app.listen(8080, (error) => {
  if (error) {
    console.log('Error starting the server');
    return;
  }
  console.log('Server is running on port', 8080);
});
