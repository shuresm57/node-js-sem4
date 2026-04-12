import { Router } from 'express';

import jwt from 'jsonwebtoken';
import { hashPassword, comparePassword } from '../util/passwordUtil.js';

const router = Router();

const usersArray = [];

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if(!password || !username) return res.status.(400).send('Username and password are required.');

  try {
    const existingUser = await usersArray.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).send('User already exists');
    }



    const hashedPassword = await hashPassword(password);
    const newUser = {
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await usersArray.find(user => user.username === username);

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
      { username: user.username }, // Payload (data inside the token)
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: '1h' } // Token expiration time
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000
    });
    res.status(200).send('User logged in successfully');
  } catch (error) {
    res.status(500).send('Login failed');
  }
});

export default router;
