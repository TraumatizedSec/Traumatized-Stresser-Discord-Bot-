const fs = require("fs");

const config = require("../src/config.js");
const crud = require("../src/crud.js");

exports.user = function(discord_id, type) {
    /*

    */

    let stat_types = [ "level", "maxtime", ];
    /*
    
    */

    let data = fs.readFileSync("../db/users.db", "utf8");
    let users = data.split("\n");
    users.forEach(u => {

    })
}