import db from './connection.js';
import { hashPassword } from '../util/passwordUtil.js';
db.prepare(`
    INSERT INTO artist (name, bio, contact_email)
    VALUES ('EYES', 'A danish Hardcore Punk band from Copenhagen', 'eyesband@gmail.com')    
`).run();

db.prepare(`
    INSERT INTO venue (name, address, capacity, contact_email)
    VALUES ('Store Vega', 'Enghavevej 10', 1200, 'produktion@vega.dk')
`).run();

db.prepare(`
    INSERT INTO show (artist_id, venue_id, date, doors_time, show_time, status)
    VALUES (1, 1, '2026-04-2027','20.00','21.00','CONFIRMED')
`).run();

db.prepare(`
    INSERT INTO artist_tech_rider (artist_id, document_url)
    VALUES (1, 'https://example.com') 
`).run();

db.prepare(`
    INSERT INTO artist_hospitality_rider (artist_id, document_url)
    VALUES (1, 'https://example.com') 
`).run();

db.prepare(`
    INSERT INTO venue_tech_spec (venue_id, document_url)
    VALUES (1, 'https://example.com') 
`).run();

db.prepare(`
    INSERT INTO venue_hospitality_spec (venue_id, document_url)
    VALUES (1, 'https://example.com') 
`).run();

const eyesPassword = await hashPassword('potato123');

db.prepare(`
    INSERT INTO user (email, password_hash)
    VALUES ('eyesband@gmail.com', ?)
`).run(eyesPassword);

db.prepare(`
    INSERT INTO artist_user (artist_id, user_id, role)
    VALUES (1, 1, 'admin')
`).run();

const vegaPassword = await hashPassword('kebab420');

db.prepare(`
    INSERT INTO user (email, password_hash)
    VALUES ('produktion@vega.dk', ?)
`).run(vegaPassword);

db.prepare(`
    INSERT INTO venue_user (venue_id, user_id, role)
    VALUES (1, 2, 'admin')
`).run();
