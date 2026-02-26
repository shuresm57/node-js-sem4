#import "config.typ": *
#show: apply-styling

== Week 4: Time, Fetch and Deployment

=== Working with Time in JavaScript

*Date Methods*

```javascript
new Date()        // UTC date + time
// 28th of August, 2025, 3.30 (note that August = 7)
new Date(2025, 7, 28, 3, 30) 
Date()            // Local time string
Date.now()        // Unix timestamp (ms since Jan 1, 1970)
```

*Getting Current Month*

```javascript
// Manual array approach
const monthNames = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", 
  "September", "October", "November", "December"
];

app.get('/months/v1', (req, res) => {
  const today = new Date().getMonth(); // 0-11
  res.send(monthNames[today]);
});

// Using toLocaleString
app.get('/months/v2', (req, res) => {
  const currentMonth = new Date().toLocaleString('en-uk', { month: 'long' });
  res.send({ data: currentMonth });
});
```

*Unix TimeStamp Counter*

```javascript
const newUnix = new Date(2025, 7, 28, 3, 30).getTime();

function getTimeSinceBirthInUnix() {
  const elapsedTimeUnix = Math.floor((Date.now() - newUnix) / 1000);
  unixCounter.textContent = elapsedTimeUnix;
}

setInterval(getTimeSinceBirthInUnix, 1000); // Updates every second
```

=== Fetch API

*Basic Fetch Request*

```javascript
fetch('/movies')
  .then(response => response.json())
  .then(data => console.log(data));
```

*POST Request*

```javascript
fetch('/movies', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title: 'New Movie', description: 'Description' })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

=== Server Setup with Error handling

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/frontpage.html');
});

app.listen(8080, (error) => {
  if (error) {
    console.log('Error starting the server');
    return;
  }
  console.log('Server is running on port', 8080);
});
```

*Callback Pattern:* Optional error parameter to handle startup failures.

=== DOM Manipulation

```javascript
const counter = document.getElementById('guest-book-counter');
let counterValue = 0;

function incrementCounter() {
  counter.textContent = ++counterValue;
}
```

*JavaScript loading*

```javascript
// Inline (avoid mixing)
<script> /* code */ </script>

// External (preferred)
<script src="./frontpage.js"></script>
```

=== Falsy values

JavaScript treats these as `false` in conditionals:

- `false`
- `null`
- `undefined`
- `NaN` (not a number)
- `""` (empty string)
- `0`

```javascript
if (error) {  // Truthy check
  console.log('Error occurred');
  return;
}
```
