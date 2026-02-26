const cookie = require('./cookie.json');

function getCookie() {
    return cookie;
}

const key = "value";
const jsonObject = {
    key
}

console.log(jsonObject)

module.exports = { getCookie };