import { Router } from 'express';
import { pagesObject } from '../util/pagesUtil.js';

const router = Router();

router.get('/', (req, res) => {
  res.send(pagesObject.frontpage);
});

router.get('/projects', (req, res) => {
  res.send(pagesObject.projects);
});

router.get('/week-1', (req, res) => {
  res.send(pagesObject.week1);
});

router.get('/week-2', (req, res) => {
  res.send(pagesObject.week2);
});

router.get('/week-3', (req, res) => {
  res.send(pagesObject.week3);
});

router.get('/week-4', (req, res) => {
  res.send(pagesObject.week4);
});

router.get('/week-5', (req, res) => {
  res.send(pagesObject.week5);
});

router.get('/week-6', (req, res) => {
  res.send(pagesObject.week6);
});

router.get('/week-7', (req, res) => {
  res.send(pagesObject.week7);
});

export default router;
