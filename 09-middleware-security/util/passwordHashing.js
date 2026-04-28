import bcrypt from 'bcrypt';

const password = 'hunter123';
const passwordComparison = 'hunter123';
const saltRounds = 14;

const hashedPassword = await bcrypt.hash(password, saltRounds);

console.log(hashedPassword);

const passwordIsSame = await bcrypt.compare(passwordComparison, hashedPassword);

console.log(passwordIsSame);
