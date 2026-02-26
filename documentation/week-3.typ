#import "config.typ": *
#show: apply-styling

= Week 3: POST Requests and Loop Methods

== Loop Methods

*Rules:*

Use loop methods over `for` loops.

Use `map()` over `.forEach()` if you need data back.

Only use `for` loops for finger counting.

*Key Methods:*

```javascript
// .map() - transform 1:1
const doubled = [1, 2, 3].map(n => n * 2); // [2, 4, 6]

// .filter() - keep matches
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0); // [2, 4]

// .find() - first match
const movie = movies.find(m => m.id === 2);

// .findIndex() - index of first match
const index = movies.findIndex(m => m.id === 2);
```



== URL Structure

https://www.google.com/search?q=cool+search
#align(center)[
#table(
  columns: 2,
  align: (left, left),
  stroke: none,
  [*Part*], [*Value*],
  [Protocol],[https],
  [Protocol Identifier],[`://`],
  [Subdomain],[www],
  [Domain],[google],
  [Top Level Domain],[.com],
  [Query],[/search],
  [Protocol],[?q=cool+search],
)
]

== POST Requests

*Setup*

```javascript
const express = require('express');
const app = express();

app.use(express.json()); // Required to parse JSON bodies.
```

== Complete CRUD

Made in class with Anders - Crypto functions implemented by me.

```javascript
pp.get('/movies', (req, res) => {
  console.log('Fetching all movie ressources');

  // we do not use res.json, ever
  const encryptedMovies = movies.map(movie => ({
    ...movie,
    id: encryptId(movie.id)
  }));

  res.send({ data: encryptedMovies});
});

app.get('/movies/:id', (req, res) => {
  const providedMovieId = Number(decryptId(req.params.id));
  const foundMovie = movies.find((movie) => movie.id === providedMovieId);

  if (!foundMovie) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  } 
  
  res.send({ data: { ...foundMovie, id: encryptId(foundMovie.id) }
  });
});

app.post('/movies', (req, res) => {
  if (!req.body.title){
    return res.status(400).send({ errorMessage: 'JSON body must be provided' });
  }
  // if movies are 0 entries, return 1, else map through and find the highest id + 1
  const providedMovie = req.body;
  providedMovie.id = nextId++;
  movies.push(providedMovie);

  res.send({ data: providedMovie });
});


//TODO: Rewrite to Anders' version
app.patch('/movies/:id', (req, res) => {
  const providedMovie = movies.find((movie) => movie.id === Number(decryptId(req.params.id)));
  
  if (!providedMovie) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  } 

  if (req.body.title) providedMovie.title = req.body.title;
  if (req.body.description) providedMovie.description = req.body.description;
  
  res.send({ data: {...providedMovie, id: encryptId(providedMovie.id)} });
});


app.put('/movies/:id', (req, res) => {  
  const movieIndex = movies.findIndex((movie) => movie.id === Number(decryptId(req.params.id)));
  
  if (movieIndex === -1) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  }
  if (!req.body.title) {
    return res.status(400).send({ errorMessage: 'ID and title are required' });
  } 

  movies[movieIndex] = { id: Number(decryptId(req.params.id)), title: req.body.title, description: req.body.description };
  res.send({ data: {...movies[movieIndex], id: encryptId(movies[movieIndex].id)} });
});

app.delete('/movies/:id', (req,res) => {
  const providedMovieId = Number(decryptId(req.params.id));
  const movieIndex = movies.findIndex((movie) => movie.id === providedMovieId);

  if (movieIndex === -1) {
    return res.status(404).send({ errorMessage: `No movie found with id ${req.params.id}` });
  }

  const deletedMovie = movies.splice(movieIndex, 1)[0];
  res.send({ data: deletedMovie, message: "has been deleted" });
});

```
== PATCH vs PUT

*PATCH:*

PATCH is for partially updating a resource and the required fields are just the changes.

*PUT*

PUT is the method for fully replacing a resource - all fields are requried (except for ID).

== Status Codes

#align(center)[
#table(
  columns: 2,
  align: (left, left),
  stroke: none,
  [*Code*], [*Meaning*],
  [200],[OK],
  [201],[Created],
  [400],[Bad Request],
  [404],[Not Found],
  [500],[Server Error],
)
]

== Serving HTML & Fetch

*Backend:*

```javascript
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
```

*Frontend:*

```javascript
fetch('/movies')
  .then(res => res.json())
  .then(data => console.log(data));
```

== XSS Prevention

Using `innerHTML` to set the text in an element or tag can be a security problem and poses a threat to unwanted actions on a site, use `textContent` instead.

```javascript
// Unsafe, can be used to execute scripts
div.innerHTML = userInput;

// Safe - treats as text only
div.textContent = userInput;
```

== ID Encryption

Uses `crypto` module to encrypt ID's with AES-256-CVC. It can be important to encrypt ID's before sending to the client, so that it can prevent users guessing sequential ID's and accessing unauthorized resources.

This was a misunderstanding, it was not a part of the curriculum.

```javascript
const crypto = require('crypto');
const SECRET = process.env.SECRET_KEY;

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync(SECRET, 'salt', 32); // converts secret to 32 bytes, for the algorithm
const iv = Buffer.alloc(16, 0); // 16 bit initialization vector, needed for the algorithm as well

// to create a 32 char key
// const SECRET = crypto.randomBytes(32).toString('hex');
// console.log(SECRET);

function encryptId(id) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(String(id), 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptId(encrypted) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return parseInt(decrypted);
  } catch (error) {
    // return null if decryption fails
    return null;
  }
}
module.exports = { encryptId, decryptId };
```

== Nodemon

```javascript
npm install --save-dev nodemon
nodemon app.js
```

This npm package auto-restarts server on file changes, great for production; bad for deployment.