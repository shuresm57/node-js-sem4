import db from './connection.js';

db.execute(`
INSERT INTO artist (name, bio, contact_email)
VALUES ('EYES', 'A danish Hardcore Punk band from Copenhagen', 'eyesband@gmail.com')    
`);

db.execute(`
INSERT INTO venue (name, address, capacity, contact_mail)
VALUES ('Store Vega', 'Enghavevej 10', 1200, 'produktion@vega.dk')
`);