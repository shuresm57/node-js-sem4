import db from './connection.js';

const fruitUpdated = await db.fruits.updateMany({ name: 'Avocado'}, {$set: {price: 5000}});

console.log(fruitUpdated);