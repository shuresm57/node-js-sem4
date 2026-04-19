import dotenv from 'dotenv';

import db from './connection.js';
import { hashPassword } from '../util/passwordUtil.js';

dotenv.config({ path: '../../.env' });

const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
  db.exec('DROP TABLE IF EXISTS users;');
}

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(2500) NOT NULL,
    reset_token TEXT,
    reset_token_expiry INTEGER
  );
`);

const testEmail = process.env.TEST_EMAIL;
const testUsername = process.env.TEST_USERNAME;
const testPassword = process.env.TEST_PASSWORD;

const hashedPassword = await hashPassword(testPassword);

db.prepare(`
    INSERT INTO users (email, username, password)
    VALUES (?, ?, ?)
`).run(testEmail, testUsername, hashedPassword);
