# Utilities

## bcrypt

To safely store and use passwords we must do the following:

> a. Hash the password before storing it in the database \
> b. On login, hash the submitted password and compare it against the stored hash

This way, we never know what the actual password is, ensuring user safety across the board in regards to passwords.

In code we can do it with:

```javascript
import bcrypt from 'bcrypt'

const saltRounds = 14;

export function hashPassword(password) {
    return await bcrypt.hash(password, saltRounds)
}

export function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}
```

The salt is a random value, that is added to the password before hashing, so two users with the same password can coexist.

This prevents attackers from using rainbow tables to get passwords from precomputed hash tables.

## Nodemailer & Ethereal

https://nodemailer.com/

