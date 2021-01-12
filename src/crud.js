const fs = require("fs");

exports.user = function(discord_id, type) {
    /*
    Stat Type Validation Check
    */
    let stat_types = [ "level", "maxtime", "admin", "all" ];
    if(!stat_types.includes(type)) {
        return "Error, Invalid stat type!";
    }

    /*
    Read Db and Check for user stats
    */

    let found_check = false;
    let db_user = "";
    let db_level = "";
    let db_maxtime = "";
    let db_admin = "";

    let data = fs.readFileSync("../db/users.db", "utf8");
    let fix = data.replace("('", "");
    let fix2 = fix.replace("')", "");
    let fix3 = fix2.split("','").join(",");
    let users = fix3.split("\n");
    users.forEach(u => {
        if(u.includes(discord_id)) {
            found_check = true;
            let info = u.split(",")
            db_user = info[0];
            db_level = info[1];
            db_level = info[2];
            db_maxtime = info[3];
            db_admin = info[4];
        }
    })

    if(found_check == false) {
        return "No user found";
    } else {
        switch(type) {
            case stat_types[0]:
                return db_level;
            case stat_types[1]:
                return db_maxtime;
            case stat_types[2]:
                return db_admin;
            case stat_types[3]:
                return db_user + "," + discord_id + "," + db_level + "," + db_maxtime + "," + db_admin;
        }
    }
}

exports.update = function(discord_id, type, new_stat) {

}