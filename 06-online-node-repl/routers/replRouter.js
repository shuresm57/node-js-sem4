import { Router } from 'express';
import { getOrCreateSandboxContext, executeCodeInSandbox } from '../util/replUtil.js';

const router = Router();

router.get('/hello', (req, res) => {
    res.send({ data: 'Hello :D' });
})

router.post('/api/repl', (req, res) => {
    // let replCode = req.body?.replCode;

    console.log(req.body);

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
      return res.status(500).send({ 
        data: { error },
        errorMessage: 'Error executing the provided code'
      });
    }

    res.send({ data: { success, output, result } });
})

export default router;