import db from './connection.js';

const fruitDeleted = await db.fruits.deleteMany({ name: 'Avocado' });

console.log(fruitDeleted);