# Middleware

## JWT

JSON Web Token is a standardized way to transmit claims between two parties as a cryptographically signed token — the payload is readable but tamper-proof.

We use it for two things:

1. Attaching a token to a user, granting them access to resources, as long as their credentials exists in our database
2. Generating a secure URL for password recovery that only exists for 15 minutes.

This way we ensure a higher level of security between frontend and backend, or a backend and multiple services.

JWT is scalable because it is stateless, meaning any service with the secret key can verify the token independently, without a shared session store.

Couldnt have done it without these helpful people:

> [www.laraibrabbani.net/](https://www.laraibrabbani.net/blog/nodejs/creating-secure-password-flows-with-nodejs-and-mysql?utm_source=chatgpt.com)
> [Digital Ocean Article](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs?utm_source=chatgpt.com#advanced-jwt-security)
> [Medium Article](https://medium.com/@aishwaryajanardhana/one-stop-guide-to-jwt-authentication-with-node-js-c0e796821a33) \
> [dev.to Article](https://dev.to/akshaykurve/handling-authentication-with-jwt-the-right-way-in-nodejs-2026-edition-25na#what-is-jwt-in-simple-terms)

For more information, read the [IETF Official Document on JWT](https://datatracker.ietf.org/doc/html/rfc7519)

## requireAuth

This is a middleware, which also utilizes the token, to check if a user is authorized to access protected routes. We cab drop it as a 2nd argument into a GET or POST method, that should require login.

1. It reads the `httpOnly` token that is set from the `api/login` endpoint.
2. Verfies the signature with `JWT_SECRET`, returns a 401 if it could not verify
3. On success, it attaches the decoded payload

Implementation example:

```javascript
router.get('/api/home', requireAuth, (req, res) => { ... });
```