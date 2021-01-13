const crud = require("./crud.js");
const extra = require("./extra.js");

// const boot_management = require("./boot_management.js");

/*
THIS SCRIPT IS TO TEST FUNCTION IN THIS PROJECT!
*/

// console.log(crud.update(process.argv[2], process.argv[3], process.argv[4])) //UPDATE USER (SCRIPT USAGE SCRIPT.JS <DISCORD_ID> <STAT> <NEW_STAT>)
// console.log(crud.user(process.argv[2], process.argv[3])) //GET USER STATS (SCRIPT USAGE SCRIPT.JS <DISCORD_ID> <STAT_TYPE>)
// console.log(crud.remove(process.argv[2])) //REMOVES USER (SCRIPT USAGE SCRIPT.JS <DISCORD_ID>)
// console.log(crud.isRegistered(process.argv[2])) //CHECK IF USER IS REGISTERED 
// console.log(boot_management.get_apis())
console.log(extra.removestr(process.argv[2], process.argv[3]))