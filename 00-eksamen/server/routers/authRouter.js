import 'dotenv/config';

import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { hashPassword, comparePassword } from '../util/passwordUtil.js';
import { requireAuth } from '../middleware/jwtAuthenticator.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import {
  findByEmail, saveUser,
  findArtistByUserEmail, findVenueByUserEmail,
  findShowsByArtistId, findShowsByVenueId
} from '../database/queries.js';

const router = Router();

router.post('/api/register', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const existingUser = findByEmail(email);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    saveUser(email, hashedPassword);

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/api/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = findByEmail(email);

    if (!user || !(await comparePassword(password, user.password_hash))) {
      return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        orgType: user.orgType, // can be artist or venue
        orgId: user.orgId, // again, artist_id or venue_id
        orgRole: user.orgRole // either admin or member
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.status(200).send(`${email} logged in successfully`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
});

router.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).send(`${req.body.email} logged out successfully`);
});

router.get('/api/home', requireAuth, (req, res) => {
  const email = req.user.email;
  const user = findByEmail(email);
  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  res.send({ data: { message: 'Welcome to BetterTour!', email: user.email } });
});

router.get('/api/artist', requireAuth, (req, res) => {
  const { email } = req.user;
  const artist = findArtistByUserEmail(email);

  if (!artist) {
    return res.status(404).send();
  }

  artist.shows = findShowsByArtistId(artist.artist_id);
  res.send(artist);
});

router.get('/api/venue', requireAuth, (req, res) => {
  const { email } = req.user;
  const venue = findVenueByUserEmail(email);

  if (!venue) {
    return res.status(404).send();
  }

  venue.shows = findShowsByVenueId(venue.venue_id);
  res.send(venue);
});

router.get('/api/emails/:email', (req, res) => {
  const { email } = req.params;
  const found = findByEmail(email);
  if (found) {
    return res.status(200).send();
  }
  res.status(404).send();
});

export default router;
