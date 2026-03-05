import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public'));
app.use(express.json());

// ====================== PAGES ==============================

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/frontend/frontend.html'));
})

// ====================== API ==============================

app.post('/api/repl', (req, res) => {
    let replCode = req.body?.replCode;

    if (!replCode) {
        return res.status(400).send({ errorMessage: 'Missing the key replCode in the JSON body' })
    }

    replCode = replCode.replace('console.log("', '').replace('")', '');

    res.send({ data: replCode });
})

// this is the process node runs from
// console.log(process)

// don't use magic variables, use config variables
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
  if (error) {
    // we can call on the return value for the const server, not correct to use, but most truthful
    console.log('Could not start the server on', server.address().port);
  };

  console.log('Server running on ', server.address().port);
});
