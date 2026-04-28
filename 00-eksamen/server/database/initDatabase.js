import db from './connection.js';

db.exec(`
  CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS artist (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT,
    bio TEXT,
    tech_rider TEXT,
    hospitality_rider TEXT,
    contact_email TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS venue (
    venue_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    capacity INTEGER,
    tech_specs TEXT,
    contact_of_day TEXT,
    contact_email TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS show (
    show_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_id INTEGER REFERENCES artist(artist_id),
    artist_name_manual TEXT,
    venue_id INTEGER REFERENCES venue(venue_id),
    venue_name_manual TEXT,
    date TEXT NOT NULL,
    doors_time TEXT,
    show_time TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'confirmed',
    created_by TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS artist_user (
    artist_id INTEGER NOT NULL REFERENCES artist(artist_id),
    user_id INTEGER NOT NULL REFERENCES user(user_id),
    role TEXT NOT NULL DEFAULT 'member',
    PRIMARY KEY (artist_id, user_id)
  );

  CREATE TABLE IF NOT EXISTS venue_user (
    venue_id INTEGER NOT NULL REFERENCES venue(venue_id),
    user_id INTEGER NOT NULL REFERENCES user(user_id),
    role TEXT NOT NULL DEFAULT 'member',
    PRIMARY KEY (venue_id, user_id)
  );
`);
