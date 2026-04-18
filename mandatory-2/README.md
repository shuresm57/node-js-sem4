# Server

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

> It should **never**, ever be pushed to version control.


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

## CORS

By default, CORS blocks the web page from accessing resources on another server. But by importing the `cors` library from npm, we can create a gateway that allows CORS.

```javascript
import cors from 'cors'

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

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

## JWT 

JSON Web Token is a standardized way to transmit claims between two parties as a cryptographically signed token — the payload is readable but tamper-proof.

We use it for two things:

1. Attaching a token to a user, granting them access to resources, as long as their credentials exists in our database 
2. Generating a secure URL for password recovery that only exists for 15 minutes.

This way we ensure a higher level of security between frontend and backend, or a backend and multiple services.

JWT is scalable because it is stateless, meaning any service with the secret key can verify the token independently, without a shared session store.

Configured with inspiration from: 

> [Medium Article](https://medium.com/@aishwaryajanardhana/one-stop-guide-to-jwt-authentication-with-node-js-c0e796821a33) \
> [dev.to Article](https://dev.to/akshaykurve/handling-authentication-with-jwt-the-right-way-in-nodejs-2026-edition-25na#what-is-jwt-in-simple-terms)

For more information, read the [IETF Official Document on JWT](https://datatracker.ietf.org/doc/html/rfc7519)

## Rate Limiting

Rate limiting is used to limit repeated requests for endpoints. We use two rate limiters in this project, one for the whole website, and then one that is set specifically up for authorization.

We use a rate limiter, because we want to prevent abuse and ensure a fair and stable use of resources to our users. 

The general limiter:

```javascript
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});
```

Authorization limiter:

```javascript 
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false
});
```

The key difference here being the `limit:` - in the general we set it to 100 and for the authorization it is set to 10, to drastically limit the amount of requests that can be made.

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

>**Content-Security-Policy**:  
>A powerful allow-list of what can happen on your page which mitigates many attacks \
>**Cross-Origin-Opener-Policy**: Helps process-isolate your page \
>**Cross-Origin-Resource-Policy**: Blocks others from loading your resources cross-origin\
>**Origin-Agent-Cluster**: Changes process isolation to be origin-based\
>**Referrer-Policy**: Controls the Referer header\
>**Strict-Transport-Security**: Tells browsers to prefer HTTPS \
>**X-Content-Type-Options**: Avoids MIME sniffing \
>**X-DNS-Prefetch-Control**: Controls DNS prefetching \
>**X-Download-Options**: Forces downloads to be saved (Internet Explorer only) \
>**X-Frame-Options**: Legacy header that mitigates clickjacking attacks \
>**X-Permitted-Cross-Domain-Policies**: Controls cross-domain behavior for Adobe products, like Acrobat \
>**X-Powered-By**: Info about the web server. Removed because it could be used in simple attacks \
>**X-XSS-Protection**: Legacy header that tries to mitigate XSS attacks, but makes things worse, so Helmet disables it 

## Nodemailer & Ethereal

https://nodemailer.com/

## Secure Password Recovery

https://blog.logrocket.com/implementing-secure-password-reset-node-js/

## Private Routes

http://sveltestarterkit.com/blog/sveltekit-spa-protected-routes