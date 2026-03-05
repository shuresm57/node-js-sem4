import express from 'express';
import path from 'path';

const app = express();
app.use(express.static('public'));
app.use(express.json());

// ====================== PAGES ==============================

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/frontend/frontend.html'));
})

app.get('/about', (req, res) => {
  res.sendFile(path.resolve('public/about/about.html'));
})

// ====================== API ==============================

import { getOrCreateSandboxContext, executeCodeInSandbox } from './util/replUtil.js';

app.post('/api/repl', (req, res) => {
    // let replCode = req.body?.replCode;

    if(!req.body) {
      return res.status(400).send({ errorMessage: 'Missing a JSON body' });
    }

    const {replCode, sandBoxID } = req.body;

    if (!replCode) {
        return res.status(400).send({ errorMessage: 'Missing the key replCode in the JSON body' })
    }

    const sandbox = getOrCreateSandboxContext(sandBoxID);

    const { error, success, output, result } = executeCodeInSandbox(sandbox, replCode);


    if(error) {
      return res.status(500).send({ errorMessage: 'Error executing the provided code'});
    }

    res.send({ data: { success, output, result } });
})

// this is the process node runs from
// console.log(process)

// don't use magic variables, use config variables
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, (error) => {
  if (error) {
    // we can call on the return value for the const server, not correct to use, but most truthful
    console.log('Could not start the server on', error.message);
  };

  console.log('Server running on ', server.address().port);
});
