const crypto = require('crypto');

const SECRET = process.env.SECRET_KEY
// to create a 32 char key

// const SECRET = crypto.randomBytes(32).toString('hex');
// console.log(SECRET);

function encryptId(id) {
    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        crypto.scryptSync(SECRET, 'salt', 32),
        Buffer.alloc(16, 0)
    );
    let encrypted = cipher.update(String(id), 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptId(encrypted) {
    try {
        const decipher = crypto.createDecipheriv(
            'aes-256-cbc',
            crypto.scryptSync(SECRET, 'salt', 32),
            Buffer.alloc(16, 0)
        );
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return parseInt(decrypted);
    } catch (error) {
        return null;
    }
}


module.exports = { encryptId, decryptId };