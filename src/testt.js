const extra = require("./extra.js");
const current = new Date();

// console.log(extra.test(process.argv[2]))

console.log(current.getMonth()+1 + "/" + current.getDate() + "/" + current.getFullYear())