import { Router } from 'express';
import { frontpagePage, aboutPage } from '../util/pagesUtil.js';

const router = Router();

router.get('/', (req, res) => {
  res.send(frontpagePage);
})

router.get('/about', (req, res) => {
  res.send(aboutPage);
})

export default router;