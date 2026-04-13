import { Router } from 'express';

import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../util/passwordUtil.js';
import { requireAuth } from '../middleware/jwtAuthenticator.js';

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
    res.status(200).send('User logged in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
});

router.get('/api/home', requireAuth, (req, res) => {
  const user = usersArray.find(u => u.username === req.user.username);
  res.send({ data: { message: 'Welcome to the fanclub!', email: user.email } });
});

export default router;
