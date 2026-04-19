import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

import { hashPassword, comparePassword } from '../util/passwordUtil.js';
import { requireAuth } from '../middleware/jwtAuthenticator.js';
import { sendWelcomeEmail, sendPasswordRecoveryEmail } from '../util/emailUtil.js';
import { 
  findByEmail, findByUsername, saveUser, 
  setExpiryTokenByEmail, findUserByToken, updateUserAndToken 
} from '../database/queries.js';

const router = Router();

router.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  if (!password || !username || !email) {
    return res.status(400).send('Email, username and password are required.');
  }

  try {
    const existingUser = findByUsername(username);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    saveUser(email, username, hashedPassword);

    sendWelcomeEmail(email, username);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = findByUsername(username);

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign(
      { username: user.username }, // payload (data inside the token)
      process.env.JWT_SECRET, // secret key for signing the token
      { expiresIn: '1h' } // token expiration time
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    res.status(200).send(`${username} logged in successfully`);
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
  res.status(200).send(`${req.body.username} logged out successfully`);
});

router.get('/api/home', requireAuth, (req, res) => {
  const username = req.user.username;
  const user = findByUsername(username);
  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  res.send({ data: { message: 'Welcome to the fanclub!', email: user.email, username: user.username } });
});

router.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const found = findByUsername(username);
  if (found) {
    return res.status(200).send({ field: 'username' });
  }

  res.status(404).send();
});

router.get('/api/emails/:email', (req, res) => {
  const { email } = req.params;
  const found = findByEmail(email);
  if (found) {
    return res.status(200).send();
  }
  res.status(404).send();
});

router.post('/api/request-reset', (req, res) => {
  const { email } = req.body;
  const user = findByEmail(email);

  if (!user) {
    return res.status(404).send('No account with that email.');
  }

  const token = crypto.randomUUID();
  const expiry = Date.now() + 15 * 60 * 1000;

  setExpiryTokenByEmail(email, expiry, token);
  sendPasswordRecoveryEmail(email, user.username, `${process.env.CLIENT_URL}/reset-password?token=${token}`);

  res.status(200).send('Reset link sent.');
});

router.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const user = findUserByToken(token, Date.now());
  if (!user) {
    return res.status(400).send('Invalid or expired token.');
  }

  const hashed = await hashPassword(newPassword);
  updateUserAndToken(user.id, hashed);

  res.status(200).send('Password updated successfully.');
});

export default router;
