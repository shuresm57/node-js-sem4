const crypto = require('crypto');
const SECRET = process.env.SECRET_KEY;

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(SECRET, 'salt', 32); // converts secret to 32 bytes, for the algorithm
const iv = Buffer.alloc(16, 0); // 16 bit initialization vector, needed for the algorithm as well

// to create a 32 char key
// const SECRET = crypto.randomBytes(32).toString('hex');
// console.log(SECRET);

function encryptId(id) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(String(id), 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptId(encrypted) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return parseInt(decrypted);
  } catch (error) {
    // return null if decryption fails
    return null;
  }
}
module.exports = { encryptId, decryptId };