# Utilities

Helper functions used by the routers. Two files live here:

- `passwordUtil.js` — bcrypt wrappers for hashing and comparing passwords
- `emailUtil.js` — Nodemailer + Ethereal for sending welcome and password-recovery emails

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

[Nodemailer](https://nodemailer.com/) is the actual mail-sending library. [Ethereal](https://ethereal.email/) is a fake SMTP service it integrates with — every email you "send" is captured and given a preview URL instead of being delivered. Perfect for development, no real inbox needed.

`emailUtil.js` creates a fresh test account on startup and exports two helpers:

```javascript
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: { user: testAccount.user, pass: testAccount.pass },
});
```

`sendWelcomeEmail(email, username)` is called on registration, `sendPasswordRecoveryEmail(email, name, link)` is called when someone requests a password reset. Both log a `Preview URL` to the server console — open that URL to see the rendered email.

## Secure Password Recovery

The flow:

1. User submits their email to `/api/request-reset`.
2. We generate a random `crypto.randomUUID()` token and store it on the user row with a 15-minute expiry.
3. We email a link like `http://localhost:5173/reset-password?token=<token>`.
4. User clicks the link, types a new password, and submits to `/api/reset-password`.
5. We look up the user by token (only if `expiry > now`), hash the new password, and clear the token.

The token is single-use because we null it out after a successful reset. The 15-minute window limits how long a leaked email is dangerous.

> Based on: [Implementing a secure password reset in Node.js (LogRocket)](https://blog.logrocket.com/implementing-secure-password-reset-node-js/)
