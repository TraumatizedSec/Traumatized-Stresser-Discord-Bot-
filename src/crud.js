const fs = require("fs");

const config = require("../src/config.js");
const crud = require("../src/crud.js");

exports.user = function(discord_id, type) {
    /*
    Stat Type Validation Check
    */
    let stat_types = [ "level", "maxtime", "admin", "all"];
    if(!stat_types.includes(type)) {
        return "Error, Invalid stat type!";
    }

    /*
    Read Db and Check for user stats
    */

    let db_user = "";
    let db_level = "";
    let db_maxtime = "";
    let db_admin = "";

    let data = fs.readFileSync("../db/users.db", "utf8");
    let fix = data.replace("('", "");
    let fix2 = fix.replace("')", "");
    let fix2 = fix2.replace("','", ",");
    let users = fix3.split("\n");
    users.forEach(u => {
        if(u.includes(discord_id)) {
            let info = u.split(",")
            db_user = info[0];
            db_level = info[2];
            db_level = info[3];
            db_maxtime = info[4];
            db_admin = info[5]
        }
    })
}