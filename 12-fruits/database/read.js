import db from './connection.js';
// this has to be in query, quirk in mongoDB
const fruit = await db.fruits.find({ name: 'Banana' }).toArray();

console.log(fruit);
