# Routers

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

## What's in here

`authRouter.js` holds every auth-related endpoint:

| Endpoint | Purpose |
|---|---|
| `POST /api/register` | Create a new user (hashed password, sends welcome email) |
| `POST /api/login` | Verify credentials and set a JWT cookie |
| `POST /api/logout` | Clear the JWT cookie |
| `GET  /api/home` | Protected — returns the current user (requires `requireAuth`) |
| `GET  /api/users/:username` | Check if a username is taken (used by sign-up form) |
| `GET  /api/emails/:email` | Check if an email is taken |
| `POST /api/request-reset` | Generate a password-reset token, email the link |
| `POST /api/reset-password` | Consume the reset token, update password |

The protected route uses `requireAuth` from [`middleware/`](../middleware/README.md). Password hashing and email sending live in [`util/`](../util/README.md).
