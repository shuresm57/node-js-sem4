import db from './connection.js';

export function findByEmail(email) {
  return db.prepare('SELECT * FROM user WHERE email = ?').get(email);
}

export function saveUser(email, hashedPassword) {
  return db.prepare('INSERT INTO user (email, password_hash) VALUES (?, ?)').run(email, hashedPassword);
}
