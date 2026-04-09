import { Router } from 'express';

const router = Router();

const restaurants = ['sultan', 'sheik', 'hero', 'poullet'];

router.get('/api/restaurants', (req, res) => {
  res.send({ data: restaurants });
});

export default router;
