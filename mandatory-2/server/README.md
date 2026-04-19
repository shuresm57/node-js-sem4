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

## CORS

By default, CORS blocks the web page from accessing resources on another server. But by importing the `cors` library from npm, we can create a gateway that allows CORS.

```javascript
import cors from 'cors'

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

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
