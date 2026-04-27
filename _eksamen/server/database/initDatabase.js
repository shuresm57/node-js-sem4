import db from './connection.js';

db.exec(`
CREATE TABLE IF NOT EXISTS artist (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    bio TEXT,
    contact_email TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS venue (
    venue_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT,
    capacity INTEGER,
    contact_email TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS show (
    show_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_id INTEGER REFERENCES artist(artist_id),
    venue_id INTEGER REFERENCES venue(venue_id),
    date TEXT,
    doors_time TEXT,
    show_time TEXT,
    status TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS artist_tech_rider (
    artist_rider_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_id INTEGER REFERENCES artist(artist_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS artist_hospitality_rider (
    artist_hosp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_id INTEGER REFERENCES artist(artist_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS venue_tech_spec (
    venue_tech_spec_id INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_id INTEGER REFERENCES venue(venue_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS venue_hospitality_spec (
    venue_hosp_spec_id INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_id INTEGER REFERENCES venue(venue_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
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
