"use strict";


//Missing declaration type
//Never ever do this
// totalGlobalVariable = "";

// Dont ever do this
var globalVariable = "This is defined in the global scope";

// const public = "this variable is named public";

// not an object because of missing key:value pairs
{ // it is a block scope
    var someVariable = true;
    {
        var someVariable = false;
    }
    // console.log(someVariable);
    //this will return false, which could be a bug later on
}

{
    let someVariable = true;
    {
        let someVariable = false;
    }
    console.log(someVariable);
}


// will print out 6 six times
// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1000);
// }

// will print out 0-4
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        console.log(i);
    }, 1000);
}