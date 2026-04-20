import db from '../database/connection.js';

export function findByUsername (username) {
  return db.prepare(`
    SELECT * 
    FROM users 
    WHERE username = ?
    `).get(username);
}

export function findByEmail (email) {
  return db.prepare(`
      SELECT *
      FROM users
      WHERE users.email = ?
  `).get(email);
}

export function saveUser (email, username, hashedPassword) {
  return db.prepare(`
        INSERT INTO users
        (email, username, password)
        VALUES (?, ?, ?)
      `).run(email, username, hashedPassword);
}

export function setExpiryTokenByEmail (token, expiry, email) {
  return db.prepare(
    `UPDATE users 
    SET reset_token = ?, reset_token_expiry = ? 
    WHERE email = ?`
  ).run(token, expiry, email);
}

export function findUserByToken (token, date) {
  return db.prepare(
    `SELECT *
    FROM users 
    WHERE reset_token = ? 
    AND reset_token_expiry > ?`
  ).get(token, date);
}

export function updateUserAndToken (hashed, id) {
  return db.prepare(
    `UPDATE users 
    SET password = ?, 
    reset_token = NULL, 
    reset_token_expiry = NULL 
    WHERE id = ?`
  ).run(hashed, id);
}
