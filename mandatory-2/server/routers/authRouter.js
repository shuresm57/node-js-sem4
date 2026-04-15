import { Router } from 'express';

import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../util/passwordUtil.js';
import { requireAuth } from '../middleware/jwtAuthenticator.js';
import { sendWelcomeEmail, sendPasswordRecoveryEmail } from '../util/emailUtil.js';
const router = Router();

const usersArray = [];

router.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;

  if(!password || !username || !email) return res.status(400).send('Email, username and password are required.');

  try {
    const existingUser = await usersArray.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      email,
      username,
      password: hashedPassword
    };
    usersArray.push(newUser);
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
    const user = await usersArray.find(user => user.username === username);

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
  const user = usersArray.find(u => u.username === req.user.username);
  res.send({ data: { message: 'Welcome to the fanclub!', email: user.email, username: user.username } });
});

router.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const found = usersArray.find(u => u.username === username);
  if (found) return res.status(200).send({ field: 'username' });
  res.status(404).send();
});

router.get('/api/emails/:email', (req, res) => {
  const { email } = req.params;
  const found = usersArray.find(u => u.email === email);
  if (found) return res.status(200).send({ field: 'email' });
  res.status(404).send();
});

router.post('/api/request-reset', async (req, res) => {
  const { email } = req.body;
  const user = usersArray.find(u => u.email === email);
  if (!user) return res.status(404).send('No account with that email.');

  const token = crypto.randomUUID();
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

  sendPasswordRecoveryEmail(email, user.username, `http://localhost:5173/reset-password?token=${token}`);

  res.status(200).send('Reset link sent.');
});

router.post('/api/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const user = usersArray.find(u => u.resetToken === token && u.resetTokenExpiry > Date.now());
  if (!user) return res.status(400).send('Invalid or expired token.');

  user.password = await hashPassword(newPassword);
  user.resetToken = null;
  user.resetTokenExpiry = null;

  res.status(200).send('Password updated successfully.');
});

export default router;
