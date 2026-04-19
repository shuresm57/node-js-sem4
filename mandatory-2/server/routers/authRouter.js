import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

import { hashPassword, comparePassword } from '../util/passwordUtil.js';
import { requireAuth } from '../middleware/jwtAuthenticator.js';
import { sendWelcomeEmail, sendPasswordRecoveryEmail } from '../util/emailUtil.js';
import db from '../database/connection.js';

const router = Router();

router.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  if(!password || !username || !email) return res.status(400).send('Email, username and password are required.');

  try {
    const existingUser = db.prepare(`SELECT id FROM users WHERE username = ?`).get(username);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    db.prepare(`
      INSERT INTO users
      (email, username, password)
      VALUES (?, ?, ?)
    `).run(email, username, hashedPassword);

    sendWelcomeEmail(email, username)
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = db.prepare(`
      SELECT *
      FROM users
      WHERE users.username = ?
    `).get(username);

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
      { username: user.username }, // payload (data inside the token)
      process.env.JWT_SECRET, // secret key for signing the token
      { expiresIn: '1h' } // token expiration time
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // should be true (https) for production
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
    secure: false,
    sameSite: 'strict'
  });
  res.status(200).send(`${req.body.username} logged out successfully`)
})

router.get('/api/home', requireAuth, (req, res) => {
  const user = db.prepare(`SELECT email, username FROM users WHERE username = ?`).get(req.user.username);
  if (!user) return res.status(404).send({ error: 'User not found' });
  res.send({ data: { message: 'Welcome to the fanclub!', email: user.email, username: user.username } });
});

router.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const found = db.prepare(`SELECT id FROM users WHERE username = ?`).get(username);
  if (found) return res.status(200).send({ field: 'username' });
  res.status(404).send();
});

router.get('/api/emails/:email', (req, res) => {
  const { email } = req.params;
  const found = db.prepare(`
      SELECT *
      FROM users
      WHERE users.email = ?
  `).get(email);
  if (found) return res.status(200).send();
  res.status(404).send();
});

router.post('/api/request-reset', (req, res) => {
  const { email } = req.body;
  const user = db.prepare(`SELECT username FROM users WHERE email = ?`).get(email);
  if (!user) return res.status(404).send('No account with that email.');

  const token = crypto.randomUUID();
  const expiry = Date.now() + 15 * 60 * 1000;
  db.prepare(
    `UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?`
  ).run(token, expiry, email);

  sendPasswordRecoveryEmail(email, user.username, `http://localhost:5173/reset-password?token=${token}`);

  res.status(200).send('Reset link sent.');
});

router.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const user = db.prepare(
    `SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > ?`
  ).get(token, Date.now());
  if (!user) return res.status(400).send('Invalid or expired token.');

  const hashed = await hashPassword(newPassword);
  db.prepare(
    `UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?`
  ).run(hashed, user.id);

  res.status(200).send('Password updated successfully.');
});

export default router;
