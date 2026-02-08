#import "config.typ": *
#show: apply-styling

= Week 1: Introduction to Node.js

== Node.js Introduction

Node.js is a javascript runtime built on Chrome's V8 javascript engine, which allows you to run JS outside of the browser.

It is commonly used for building server-side apps, APIs and command-line tools.

It would be possible to use it for ML purposes, but there are languages that are better for this, such as Python.

*Node.js REPL*

REPL stands for Read-Eval-Print-Loop. It's an interactive environment, used for typing javascript code and seeing the immediate result.

This way you can test code snippets quickly in a terminal, instead of running it in an IDE.

== javascript Fundamentals

=== Variables and Data Types

*Declaring Variables*

Javascript has three ways to declare variables:

`const`: Used for values that won't be reassigned.

`let`: Used for values that will change.

`var`: Older way, avoid using it in modern code.

We usually only want to use `const` when assign a value to a variable, but there are times when using a `const` would cause a bug.

```javascript
for(const i = 0; i < 5; i++){
  console.log(i) // this will print 0 once
}
```

#infobox[
Best Practice: Always use `const` by default. Only use let when you know the value will change.
]

*javascript Data Types*

There are 8 data types:

1. *String* - Text values
2. *Number* - Numeric values
3. *Boolen* - True or False
4. *Object* - Collection of key-value pairs
5. *BigInt* - Very large integers
6. *Symbol* - Unique Identifiers
7. *Null* - Absence of value
8. *Undefined* - Variable declared but not assigned.

*Type Coercion*

javascript will automatically convert types when needed:

```javascript
const year = 2020;
const increment = 1;
const result = year + increment; // "20251" (string concatenation)
```
To avoid unexpected behavior, explicitly convert types:
```javascript
const numberYear = Number(year);
const newYear = numberYear + increment; // 2026 (number addition)
```

*Strict Equality*

Use `===` instead of `==` by default, unless you have a specific reason to check for type coercion:

```javascript
'5' == 5 // true (type coercion)
'5' === // false (!type coercion)
```

=== Strings and Numbers

There are 3 ways of defining string in javascript:

1. Double quotes.
2. Single quotes.
3. Backticks (Template literals).

Using double quotes, means that you can use '' inside of the String, and vice versa, whereas "" inside of a "" string, will end the String.

Using backticks, allows for string interpolation, allowing us to insert expression inside the string.

```javascript
const firstName = "Svend"
const lastName = 'Støvring Storgaard'

const fullName = `My first name is ${firstName} and my last name is ${lastName}`
```

==== String Methods

#underline[Replace word]:

```javascript
const fact = "You are learning javascript!"
const capitalizedFact = fact.replace("javascript", "javascript")


```
*Accessing String Characters*

```javascript
const letters = "abc";
console.log(letters.charAt(2)); // "c"
console.log(letters[2]);         // "c"
```

== Working with Numbers

*Converting strings to numbers*:

```javascript
// parseFloat - converts to decimal number
const numberOne = "1.10";
const numberTwo = "2.30";
const total = parseFloat(numberOne) + parseFloat(numberTwo); // 3.4

// Number - general conversion
const anotherNumber = Number("42"); // 42
```
*Number Methods*

#underline[toFixed() - format decimal places]:


```javascript
const anotherNumberOne = "1.123849";
const anotherNumberTwo = "2.30";
const sum = Number(anotherNumberOne) + Number(anotherNumberTwo);
console.log(sum.toFixed(2)); // "3.42"
```

#underline[Calculating averages]:

```javascript
const one = 10;
const two = 45;
const three = 98;
const avg = (one + two + three) / 3;
console.log(avg);
```

#infobox[
  Note: Remember order of operations! Use parentheses when calculating averages.
]

=== Arrays and Objects

*Arrays*

An ordered collection of values, accessed by index.

#underline[Creating arrays:]

```javascript
const letters = ['a', 'b', 'c']
const friends = []
```

#underline[Accessing arrays:]

```javascript
console.log(letters[1]); //b
```

#underline[Adding elements:]

```javascript
const people = []
people.push("Valdemar")
console.log(people) //Valdemar
```

#underline[Array methods:]

```javascript
const significantMathNumbers = [0, 2.718, 3.14159, 1729];

// indexOf - find the position of a value
console.log(significantMathNumbers.indexOf(1729)); // 3

// splice - insert or remove elements
const diet = ["tomato", "cucumber", "rocket"];
diet.splice(2, 0, "hamburger", "pizza", "soda");
// ["tomato", "cucumber", "hamburger", "pizza", "soda", "rocket"]

// pop - remove last element
diet.pop();

// Array.from - copy an array
const dinnerTray = Array.from(diet);
```

*Objects*

Objects store data as key-value pairs. Just like you might see in JSON (_JavaScript Object Notation_), except that JSON requires quoted keys and can't use comments - which is the key difference between the two.

#underline[Creating an object:]

```javascript
const person = {
    name: "Mathias"
};
```

#underline[Accessing properties]

```javascript
const greetings = { message: "Hello, earthling! I bring peace." };
console.log(greetings.message); // "Hello, earthling! I bring peace."
```

#underline[Modifying objects:]

```javascript
// Change existing property
person.name = "Gustav";

// Add new property
person.age = 31;

// Add to empty object
const stackOverflow = {};
stackOverflow.isAllowed = true;
```

#underline[Removing properties:]

```javascript
const thisSong = { description: "The best song in the world." };
delete thisSong.description;
thisSong.about = "Just a tribute.";
```

#infobox[
  *Important:* `const` prevents reassignment of the variable, but objects and arrays declared with `const` can still be modified internally.
]

== Code Conventions

*ASI (Automatic Semicolon Insertion)*

JavaScript automatically inserts semicolons at the end of statements. However, it is considered best practice to include them explicitly to avoid unexpected behavior.

#underline[Best Practices]

- Use const by default, let when reassignment is needed
- Use template literals for string interpolation
- Use strict equality (===) instead of loose equality (==)
- Use meaningful variable names
- Include semicolons explicitly
- Use proper indentation

*Linter*

Install ESLint or the Prettier extension and use this to format your code. It will ensure that your code is readable and therefore easily maintained and understandable for others.

*ESLint*

To install ESLint, you can use the npm package manager:

```bash
npm install -g eslint
```

Create a global config at `~/.eslintrc.json`
```json
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "single"]
  }
}
```

*Prettier*

To install Prettier, it looks the same:

```bash
npm install -g prettier
```

Create a global config at `~/.prettierrc.json`
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

*VS Code Integration*

Add this JSON to settings.json.

```json
{
  "eslint.enable": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.configPath": "~/.prettierrc"
}
```

*Code Style Documentation*

https://www.w3schools.com/js/js_conventions.asp

https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript

https://docs.gitlab.com/development/fe_guide/style/javascript/

https://www.npmjs.com/package/airbnb-style

== REST API Design

REST (_Representational State Transfer_) is an architectural style for designing networked applications. A REST API uses
HTTP requests to perform operations on resources (_resources = data_)

=== Core Principles of REST API Design

1. Using the Right HTTP Method for the Action
 Each HTTP method has a specific purpose:

- GET - Retrieve data (Read)
- POST - Create new data (Create)
- PUT - Update/replace existing data (Update)
- PATCH - Partially update existing data (Update)
- DELETE - Remove data (Delete)

These methods map to CRUD operations:

- Create → POST
- Read → GET
- Update → PUT/PATCH
- Delete → DELETE

2. The Ordering of HTTP Methods
When documenting or implementing REST APIs, methods should be presented in a standard order:

- GET (retrieve)
- POST (create)
- PUT (update/replace)
- PATCH (partial update)
- DELETE (remove)

3. Standardization of Endpoints
Endpoints should be:

- Noun-based (not verb-based) - represent resources, not actions
- Plural - use collection names (/beers not /beer)
- Hierarchical - show relationships between resources
- Consistent - follow the same patterns throughout your API

*Example: Beer API Design*

#align(center)[
#table(
  align:left,
  columns: 3,
  [Endpoint],[Method],[Description],
  [/beers],[GET],[Retrieve all beer resources.],
  [/beers/{id}],[GET],[Retrieve a beer resource by id.],
  [/beers],[POST],[Create a beer resource.],
  [/beers/{id}],[PUT],[Update a beer resource.],
  [/beers/{id}],[PATCH],[Update parts of a beer resource],
  [/beers/{id}],[DELETE],[Delete a beer resource.],
  )
]