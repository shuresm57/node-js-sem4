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
    rider_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_id INTEGER REFERENCES artist(artist_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS artist_hospitality_rider (
    rider_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_id INTEGER REFERENCES artist(artist_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS venue_tech_spec (
    spec_id INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_id INTEGER REFERENCES venue(venue_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS venue_hospitality_spec (
    spec_id INTEGER PRIMARY KEY AUTOINCREMENT,
    venue_id INTEGER REFERENCES venue(venue_id),
    document_url TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
);
`);
