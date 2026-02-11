#import "config.typ": *
#show: apply-styling

= Week 2: First Server

This week we dive deeper into Javascript, we learn more about variables, functions in general, but also callback functions and how to use them.

We also look at how to setup a Node.js server, so that we will be ready for implementing our first REST API server.

== Advanced JavaScript
=== Functions and Callbacks

The traditional way to define a function in Javascript:

```javascript
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
```
#underline[Hoisting]

Function declared are 'hoisted' to the top of their scope, meaning you can call them before they are defined in your code:

```javascript
console.log(getRandomInt(4,8))

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
```

#underline[Anonymous Functions]

Functions without a name, assigned to a variable:

```javascript
const getRandomIntAnonymousFunction = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
```

This will prevent accidental reassignment - when using `const`, you ensure the function reference can't be changed.

```javascript
const myFunc = function() { return 'original'; };
// myFunc = function() { return "new"; }; // Error! Can't reassign
```

#underline[Callback Functions]

A callback function is a function passed as an argument to another function:

```javascript
function genericActionPerformer(name, action) {
    return action(name);
}

function eatingAction(name) {
    return `${name} is eating`;
}

console.log(genericActionPerformer("Valdemar", eatingAction));
// Output: "Valdemar is eating"
```

*Callback with Anonymous Functions*:

```javascript
const runningAction = (name) => {
    return `${name} is running`;
};

console.log(genericActionPerformer("Sidi", runningAction));
// Output: "Sidi is running"
```

#underline[Inline arrow function callbacks]:

```javascript
console.log(genericActionPerformer("Kristian", (name) => `${name} is laughing`));
// Output: "Kristian is laughing"
```

#infobox[
    Callbacks are fundamental in Node.js for handling asynchronous operations, event handling, and HTTP requests.
]

=== Scoping (const, let, var)

*The problem with var*

Never use `var` in modern JavaScript because of this problematic scoping behavior:

```javascript
{
    var someVariable = true;
    {
        var someVariable = false;
    }
    console.log(someVariable) // false. inner block overwrites the outer!
}
```
`var` is function scoped, not block-scoped:

```javascript
// This prints 5 six times (bug!)
for (var i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}
```

*Use let for Block Scope*

`let` is block-scoped, which means that variables are contained within `{}`:

```javascript
{
    let someVariable = true;
    {
        let someVariable = false; // Different variable
    }
    console.log(someVariable); // true - each block has its own variable
}
```

Always use `const` unless you know the variable will be reassigned:

```javascript
const name = "Valdemar";
// name = "Niko"; // Error: Assignment to constant variable
```

*Avoid Global Variables*

Never declare variables without `const`, `let` or `var`:

```javascript
// DON'T DO THIS!
totalGlobalVariable = ""; // Creates global variable (bad!)
```

*Reserved Keywords*

Some words are reserved and cannot be used as variable names:

```javascript
break, case, catch, class, const, continue, debugger, default, delete, do, else, export, extends, finally, for, function, if, import, in, instanceof, new, return, super, switch, this, throw, try, typeof, var, void, while, with, yield
```
In strict mode:
```javascript
let, static, implements, interface, package, private, protected, public
```
== Package Management

=== NPM and Package.json

*What is NPM?*

NPM (Node Package Manager) is the default package manager for Node.js. It allows you to install third-party libraries (packages), manage project dependencies, run scripts and share your own packages.

*package.json*

This file defines your project and its dependencies. It contains metadata about your project:

```json
{
    "dependencies": {
        "express": "5.2.1"
    },
    "devDependencies": {
        "eslint": "^9.39.2"
    }
}

```

*Dependencies vs DevDependencies*

Dependencies are packages required for your application to run in production, while DevDependencies are only needed during development, such as testing, linting and build tools.

*Dependencies*

```json
"dependencies": {
    "express": "5.2.1"
}
```

*DevDependencies*


```json
"devDependencies": {
    "eslint": "^9.39.2"
}
```

*Installing packages*

```bash
# Install a dependency
npm install express

# Install a dev dependency
npm install --save-dev eslint

# Install all dependencies from package.json
npm install
```

*Version Numbers*

NPM uses semantic versioning (semver):
```bash
"express": "5.2.1"
           │ │ │
           │ │ └─ Patch (bug fixes)
           │ └─── Minor (new features)
           └───── Major (breaking changes)

```
Version prefixes
- `5.2.1` - Exact version
- `^5.2.1` - Compatible with 5.x.x (allows minor and patch updates)
- `~5.2.1` - Compatible with 5.2.x (allows only patch updates)

=== Node_modules

*What is node_modules?*

When you run `npm install`, NPM downloads all packages and their dependencies into a folder called `node_modules`.

Important:
- Never commit node_modules to Git - it's huge and unnecessary
- Add `node_modules/` to your `.gitignore` file
- Other developers run `npm install` to get the same dependencies

*How It Works*
```bash
your-project/
├── node_modules/        # All installed packages (auto-generated)
│   ├── express/
│   ├── eslint/
│   └── ... (hundreds of dependencies)
├── package.json         # Your dependency list
└── package-lock.json    # Exact versions installed
```

When you `require()` or `import` a package, Node.js looks for it in `node_modules`:

```javascript
const express = require('express'); // Loads from node_modules/express
```

== Express.js

*What is Express?*

Express is a minimal and flexible Node.js web application framework that provides a way of doing simple routing, HTTP request/response handling and easy server setup.

*Server Setup*

Basic Express Server:

```javascript
// Import express
const express = require('express');

// Create an Express application
const app = express();

// Define routes (covered below)

// Start the server on port 8080
app.listen(8080);
```

You now have a server running at `http://localhost:8080`

*GET Requests*

Basic Route:

```javascript
app.get('/'m (req, rest) => {
    res.send({ data: 'Welcome to my server!'})
});
```

`app.get()` - Defines a GET route

`'/'` - The endpoint/path

`(req, rest) => {}` - Callback function (request, response)

`res.send()` - Sends a response to the client

Multiple routes:

```javascript
app.get('/snowstorm', (req, res) => {
    res.send({ data: 'Snowstorm at 12!' });
});
```

Visit `http://localhost:8080/snowstorm` to see this response.

*Sending Data in GET requests*

There are two main ways to send data in GET requests:

1. Path Parameters (Route Parameters)

use `:paramName` in the route to capture dynamic values from the URL:

```javascript
app.get('/cars/:carModel', (req, res) => {
    console.log(req.params); // { carModel: 'tesla' }
    res.send({ data: `Your ${req.params.carModel} is very nice` });
});
```
*URL*: 

`http://localhost:8080/cars/tesla`

*Response*

 `{ data: "Your tesla is very nice" }`

Multiple path parameters:

```javascript
app.get('/cars/:carModel/:year', (req, res) => {
    console.log(req.params); // { carModel: 'tesla', year: '2024' }
    res.send({
        data: `Your ${req.params.carModel} from the year ${req.params.year} is very nice`
    });
});
```

*URL*: 

`http://localhost:8080/cars/tesla/2024`

*Response*: 

`{ data: "Your tesla from the year 2024 is very nice" }`

2. Query Parametes (Query String)

use `req.query` to access parameters from the URL query string:

```javascript
app.get('/bag', (req, res) => {
    res.send({ data: req.query });
});
```

*URL*: 

`http://localhost:8080/bag?color=red&size=large`

*Response*: 

`{ data: { color: "red", size: "large" } }`


== Summary

*Week 2 Key Concepts*

- Use arrow functions and callbacks for flexible, functional code
- Always use `const`, unless you know the value will change (never, ever use `var`)
- Understand block scope vs function scope
- Use `package.json` to manage dependencies
- Never commit `node_modules` to git
- We use Express to create web servers
- Use path parameters for resource identification
- Use query parameters for filtering and options