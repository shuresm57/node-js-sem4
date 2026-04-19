# Routers

## Authorization REST API Desing 

| Endpoint | Method | Description |
|---|---|---|
| `/api/register` | `POST` | Create a new user (hashed password, sends welcome email) |
| `/api/login` | `POST` | Verify credentials and set a JWT cookie |
| `/api/logout` | `POST` | Clear the JWT cookie |
| `/api/home` | `GET` | Protected — returns the current user (uses `requireAuth`) |
| `/api/users/:username` | `GET` | Check if a username is taken (sign-up form) |
| `/api/emails/:email` | `GET` | Check if an email is taken |
| `/api/request-reset` | `POST` | Generate a password-reset token, email the link |
| `/api/reset-password` | `POST` | Consume the reset token, update password |

## Express Router

Instead of having every API route in the main application, we can use the Router class for a modular approach to dealing with routes. I.e. we can move the methods out of our main server files

Before, we initialized routes as:

```javascript
app.get('/', (req, res) => {
    res.send({ data: someData });
})
```

And in `Router`, it is the same syntax, but we need to initialize the Router class first:

```javascript
import { Router } from 'express'

const router = Router();

router.get('/'), (req, res) => {
    res.send({ data: someData });
}

export default router;
```

By exporting the router, we can call upon the routes in `app.js` or whatever your main server application file is called.

## Secure Password Recovery
Making sure password recovery is secure matters just as much as the login flow itself. If the reset process is weak, it can become the easiest way to hack users.

How it works step by step:
1. The user submits their email to `/api/request-reset`.
2. We generate a random `crypto.randomUUID()` token and store it on the user record with a 15-minute expiry.
3. We send an email with a link like `http://localhost:5173/reset-password?token=<token>`.
4. The user clicks the link, enters a new password, and submits it to `/api/reset-password`.
5. We look up the user by token, but only when the token exists and expiry > now.
6. We then hash the new password, save it, and immediately clear the reset token.
7. That makes the token single-use, and the 15-minute expiry keeps the risk window small if the email is exposed.