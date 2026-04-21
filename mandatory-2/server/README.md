# Server

This directory holds the server code, built on Node.js with Express and SQLite.

Libraries currently in use:

> express (HTTP server) \
> better-sqlite3 (database) \
> jsonwebtoken (JWT auth) \
> bcrypt (password hashing) \
> nodemailer (email) \
> cors, helmet, express-rate-limit (security middleware)

Run the server by running these commands:

```bash
$ npm install
$ node app.js
```

## JWT

JSON Web Token is a standardized way to transmit claims between two parties as a cryptographically signed token, the payload is readable but tamper-proof.

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

## dotenv

The dotenv package is a simple, secrets or key file, made to manage the applications secrets and to give the developer a single place to securely store sensitive application secrets.

The syntax is as follows:

```
PORT=1234
JWT_SECRET=somesecret
```

In the application you then use it by:

```javascript
import dotenv from 'dotenv/config'

const PORT = process.env.PORT ?? 1234;
```

`dotenv` will find the .env file automatically, if placed in the root folder of the application.

> It should never, **ever** be pushed to version control.

## CORS

By default, CORS blocks the web page from accessing resources on another server. But by importing the `cors` library from npm, we can create a gateway that allows CORS.

```javascript
import cors from 'cors'

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## Helmet

Helmet is a middleware that helps us secure our application, be setting default headers which prevents attacks such as XSS, Clickjacking, Man-In-The-Middle and MIME sniffing.

It hides unnecessary HTTP headers, which could be used to exploit users or leak sensitive data.

```javascript
// helmet needs to be initialized before setting any routes, since it is a middleware.

import helmet from 'helmet';
app.use(helmet())
```

You can use the [mozilla observatory](https://developer.mozilla.org/en-US/observatory) to scan your website for faulty set headers.

These are the headers that are being set by Helmet:
| Header | Description |
|---|---|
| **Content-Security-Policy** | A powerful allow-list of what can happen on your page which mitigates many attacks |
| **Cross-Origin-Opener-Policy** | Helps process-isolate your page |
| **Cross-Origin-Resource-Policy** | Blocks others from loading your resources cross-origin |
| **Origin-Agent-Cluster** | Changes process isolation to be origin-based |
| **Referrer-Policy** | Controls the Referer header |
| **Strict-Transport-Security** | Tells browsers to prefer HTTPS |
| **X-Content-Type-Options** | Avoids MIME sniffing |
| **X-DNS-Prefetch-Control** | Controls DNS prefetching |
| **X-Download-Options** | Forces downloads to be saved (Internet Explorer only) |
| **X-Frame-Options** | Legacy header that mitigates clickjacking attacks |
| **X-Permitted-Cross-Domain-Policies** | Controls cross-domain behavior for Adobe products, like Acrobat |
| **X-Powered-By** | Info about the web server. Removed because it could be used in simple attacks |
| **X-XSS-Protection** | Legacy header that tries to mitigate XSS attacks, but makes things worse, so Helmet disables it |
