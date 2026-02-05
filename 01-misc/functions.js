

// hoisting 
console.log(getRandomInt(4, 8));


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}

// anonymous function
const getRandomIntAnonymousFunction = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
};

// arrow function
const getRandomIntArrowFunction = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
};

// Javascript functions as first class citizens.
// this is a callback function
// which is defined as a function that accepts a 
                            // string, function reference
function genericActionPerformer(name, action) {
    return action(name);
}


// task: eat, 
// declare a function below called eatingAction
// create a callback function and use the genericActionPerformer to
// console.log Valdemar is eating
function eatingAction(name) {
    return `${name} is eating`;
}
console.log(genericActionPerformer("Valdemar", eatingAction));
console.log(genericActionPerformer("Gustav", eatingAction));

// task, run, Sidi
//declare an anonymous function called runningAction
// make it return `Sidi is running`
// console.log it

const anonymousRunningAction = (name) => {
    return `${name} is running`
};

console.log(genericActionPerformer("Sidi", anonymousRunningAction));

// task: extra challenge
// in a single line below write
// kristian is laughing

console.log(genericActionPerformer("Kristian", (name) => `${name} is laughing`));