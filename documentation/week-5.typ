#import "config.typ": *
#show: apply-styling

= Week 5

== ES Modules vs CommonJS

*Package.json Configuration*:

```json

{
  "type": "module",
  "dependencies": {
    "express": "5.2.1"
  }
}

```

If we add the `"type": "module"` to our Package.json, it enables ES Modules syntax in Node.js.

=== CommonJS

*Exporting:*

```javascript
const cookie = require('./cookie.json');

function getCookie() {
  return cookie;
}

module.exports = { getCookie };
```

*Importing*

```javascript
const cookiesUtil = require('./util/commonjsCookiesUtil.js');
```

This is the old way and we will not do that anymore. Instead we will use ES Modules.

=== ES Modules

*Exporting:*

```javascript
// Named export
export function esModuleCookieFactory() {
  return 'On a break :D';
}

// Default export 
export default { 
  esModuleCookieFactory
};
```

*Importing*

```javascript
// Named import (requires curly braces, we can define more than one this way)
import { esModuleCookieFactory } from './util/esModuleCookiesUtil.js';

// Default import (no curly braces, for single imports)
import cookiesUtil from './util/esModuleCookiesUtil.js';
```

*ALWAYS* use the `.js` extension in ES Module imports.

=== Import / Export in HTML

*Script Type Module:*

```javascript
<!-- Scripts share global scope - can talk to each other -->
<script src="./common.js"></script>
<script src="./cookieFactory.js"></script>
```

All scripts share the same global scope, but order matters! This also makes it harder to manage.

*Therefore:*

```javascript
<!-- ES Module - isolated scope -->
<script type="module" src="./cookies.js"></script>
```

Every script imported like this, has its own scape and can share code. The order is automatically handled by the browser.

=== Export Patterns

*Named Exports (recommended)*

```javascript
// Export multiple
export function func1() { }
export const value = 42;

// Import specific
import { func1, value } from './module.js';
```
*Default Export:*

```javascript
// One per file
export default function() { }

// Import without braces
import myFunction from './module.js';
```

=== Serving Static Files

*Security Need*

Without static file serving, users can't access CSS, JS or images. We need to give explicit permission to Express in order to serve these files.

```javascript
import express from 'express';
const app = express();

// Serve files from 'public' directory
app.use(express.static('public'));
```

=== File Paths in Express

*ALWAYS use path.resolve*

```javascript
import path from 'path';

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/frontpage/frontpage.html'));
});

app.get('/cookieFactory', (req, res) => {
  res.sendFile(path.resolve('public/cookieFactory/cookieFactory.html'));
});
```

*Why?* Creates absolute paths (required by `sendFile`). 

`__dirname` is a commonJS specific variable and won't work anymore. 


=== Typical Project Structure
```bash
project/
├── public/ # client
│   ├── frontpage/
│   │   ├── frontpage.html
│   │   └── frontpage.css
│   └── cookieFactory/
├── util/ # server               
│   └── esModuleCookiesUtil.js
├── package.json # server   
└── app.js # server   
```

=== Redirection

*Client-Side Redirection:*

```javascript
// Timed redirect
setTimeout(() => {
  window.location.href = '/success';
}, 2000);
```

```HTML
<meta http-equiv="refresh" content="3;url=/success">
```

*Why use this?*

In some cases, we want to redirect users after x amount of time. Could be because of a form submission.

*Server-Side Redirection:*

```javascript
app.get('/old-page', (req, res) => {
  res.redirect('/new-page');
});
```

*Key Concepts*

- Use ES Modules with "type": "module" - never use CommonJS

- Always include .js in ES Module imports

- Use app.use(express.static('public')) for static files

- Use path.resolve() for file paths

- Client redirection: JavaScript/meta tags (user actions)

- Server redirection: res.redirect()

- ES Modules work in browsers and Node.js