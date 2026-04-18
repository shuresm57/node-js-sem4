import db from './connection.js';

const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
    await db.exec(`DROP TABLE IF EXISTS ingredients;`);
    await db.exec(`DROP TABLE IF EXISTS recipes;`);
}

await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(30) NOT NULL,
        password VARCHAR(2500) NOT NULL
    );
`);

if (deleteMode) {
    await db.run(`INSERT INTO recipes (recipe_name) VALUES ('Potato Pancakes');`);
    await db.run(`INSERT INTO recipes VALUES ('2', 'Baked Potato', "Also known as a jacket potato. It's a treat in the winter months.", 12);`);
    await db.run(`INSERT INTO ingredients (recipe_id, ingredient_name, units, unit_of_measurement) VALUES (1, 'flour', '0.06', 'kg')`);
    await db.run(`INSERT INTO ingredients (recipe_id, ingredient_name, units, unit_of_measurement) VALUES (2, 'bacon', '1', 'kg')`);
}