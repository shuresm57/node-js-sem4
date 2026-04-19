import db from '../database/connection.js';

export function findByUsername (username) {
  db.prepare('SELECT id FROM users WHERE username = ?').get(username);
}

export function findByEmail (email) {
  db.prepare(`
      SELECT *
      FROM users
      WHERE users.email = ?
  `).get(email);
}

export function saveUser (email, username, hashedPassword) {
  db.prepare(`
        INSERT INTO users
        (email, username, password)
        VALUES (?, ?, ?)
      `).run(email, username, hashedPassword);
}

export function setExpiryTokenByEmail(token, expiry, email) {
  db.prepare(
    `UPDATE users 
    SET reset_token = ?, reset_token_expiry = ? 
    WHERE email = ?`
  ).run(token, expiry, email);
}

export function findUserByToken(token, date){
    db.prepare(
    'SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > ?'
  ).get(token, date);
}

export function updateUserAndToken(hashed, id) {
    db.prepare(
    'UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?'
  ).run(hashed, id);
}