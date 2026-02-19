//import
const express = require('express');
//initialize
const app = express();

console.log(new Date()); //UTC date + time
console.log(Date()); // Local Time
console.log(Date.now); // Unix Epoch (Seconds since 1.1.1970)

// task create a route that returns today's day

const monthNames = [
    "January", "February", "March", "April", 
    "May", "June", "July", "August", 
    "September", "October", "November", "December"
]

app.get('/months/v1', (req, res) =>{
    const today = new Date().getMonth();
    res.send(monthNames[today]);
});


app.get('/months/v2', (req, res) =>{
  const currentMonth = new Date().toLocaleString('en-uk', { month: 'long' });
  res.send({ data: currentMonth });
});

//task create a route than responds with today's day

const weekdayNames = [
    "Sunday","Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday","Saturday"
]


app.get('/days/v1', (req, res) =>{
  const weekday = new Date().toLocaleString('en-uk', { weekday: 'long' });
  res.send({ data: weekday });   
});

app.get('/days/v2', (req, res) =>{
    res.send(weekdayNames[new Date().getDay()]);
});

/*
    falsy values:
    false, null, undefined, NaN, "" (empty strings),
*/

//listen
app.listen(8080, (error) => {
    if (error) {
        console.log("Error starting the server");
        return;
    }
    console.log("Server is running on port", 8080)
});