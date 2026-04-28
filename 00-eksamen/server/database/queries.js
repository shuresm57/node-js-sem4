import db from './connection.js';

export function findByEmail (email) {
  return db.prepare('SELECT * FROM user WHERE email = ?').get(email);
}

export function saveUser (email, hashedPassword) {
  return db.prepare('INSERT INTO user (email, password_hash) VALUES (?, ?)').run(email, hashedPassword);
}

export function findArtistByUserEmail (email) {
  return db.prepare(`
    SELECT a.* FROM artist a
    JOIN artist_user au ON a.artist_id = au.artist_id
    JOIN user u ON au.user_id = u.user_id
    WHERE u.email = ?
  `).get(email);
}

export function findVenueByUserEmail (email) {
  return db.prepare(`
    SELECT v.* FROM venue v
    JOIN venue_user vu ON v.venue_id = vu.venue_id
    JOIN user u ON vu.user_id = u.user_id
    WHERE u.email = ?
  `).get(email);
}

export function findShowsByArtistId (artistId) {
  return db.prepare(`
    SELECT s.*, v.name AS venue_name, v.address AS venue_address
    FROM show s
    JOIN venue v ON s.venue_id = v.venue_id
    WHERE s.artist_id = ?
    ORDER BY s.date ASC
  `).all(artistId);
}

export function findShowsByVenueId (venueId) {
  return db.prepare(`
    SELECT s.*, a.name AS artist_name
    FROM show s
    JOIN artist a ON s.artist_id = a.artist_id
    WHERE s.venue_id = ?
    ORDER BY s.date ASC
  `).all(venueId);
}
