# Middleware

## JWT

JSON Web Token is a standardized way to transmit claims between two parties as a cryptographically signed token — the payload is readable but tamper-proof.

We use it for two things:

1. Attaching a token to a user, granting them access to resources, as long as their credentials exists in our database
2. Generating a secure URL for password recovery that only exists for 15 minutes.

This way we ensure a higher level of security between frontend and backend, or a backend and multiple services.

JWT is scalable because it is stateless, meaning any service with the secret key can verify the token independently, without a shared session store.

## requireAuth

`jwtAuthenticator.js` exports a `requireAuth` middleware. Drop it in front of any route that should only be reachable by an authenticated user:

```javascript
router.get('/api/home', requireAuth, (req, res) => { ... });
```

Internally it reads the JWT from the `httpOnly` cookie that `/api/login` sets, verifies the signature with `JWT_SECRET`, and either calls `next()` (attaching the decoded payload to `req.user`) or responds with `401`.

```javascript
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ error: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).send({ error: 'Invalid Token' });
    req.user = user;
    next();
  });
};
```

The token signing happens in [`routers/authRouter.js`](../routers/authRouter.js) inside `/api/login`. The middleware here is the consumer side.

Couldnt have done it without these helpful people:

> [www.laraibrabbani.net/](https://www.laraibrabbani.net/blog/nodejs/creating-secure-password-flows-with-nodejs-and-mysql?utm_source=chatgpt.com)
> [Digital Ocean Article](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs?utm_source=chatgpt.com#advanced-jwt-security)
> [Medium Article](https://medium.com/@aishwaryajanardhana/one-stop-guide-to-jwt-authentication-with-node-js-c0e796821a33) \
> [dev.to Article](https://dev.to/akshaykurve/handling-authentication-with-jwt-the-right-way-in-nodejs-2026-edition-25na#what-is-jwt-in-simple-terms)

For more information, read the [IETF Official Document on JWT](https://datatracker.ietf.org/doc/html/rfc7519)
