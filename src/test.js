var crud = require("./crud.js");
<<<<<<< Updated upstream
const boot_management = require("./boot_management.js");
=======
var boot_management = require("./boot_management.js");
>>>>>>> Stashed changes

/*
THIS SCRIPT IS TO TEST FUNCTION IN THIS PROJECT!
*/

// console.log(crud.update(process.argv[2], process.argv[3], process.argv[4])) //UPDATE USER (SCRIPT USAGE SCRIPT.JS <DISCORD_ID> <STAT> <NEW_STAT>)
// console.log(crud.user(process.argv[2], process.argv[3])) //GET USER STATS (SCRIPT USAGE SCRIPT.JS <DISCORD_ID> <STAT_TYPE>)
// console.log(crud.remove(process.argv[2])) //REMOVES USER (SCRIPT USAGE SCRIPT.JS <DISCORD_ID>)

console.log(boot_management.get_apis())