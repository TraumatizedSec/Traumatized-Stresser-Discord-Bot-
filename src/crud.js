const fs = require("fs");

const config = require("./config.js");
const crud = require("./crud.js");

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

    let data = fs.readFileSync("./db/users.db", "utf8");
    let fix = data.split("('").join("");
    let fix2 = fix.split("')").join("");
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
    /*
    Stat Type Validation Check
    */
   let stat_types = [ "level", "maxtime", "admin" ];
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

   let get_user = crud.user(discord_id, "all");
   let split_info = get_user.split(",");
   db_user = split_info[0];
   db_level = split_info[2];
   db_maxtime = split_info[3];
   db_admin = split_info[4];

   crud.remove(discord_id);

   if(!get_user) {
       return "No user found";
   } else {
       switch(type) {
           case stat_types[0]:
               fs.appendFileSync("./db/users.db", "('" + db_user + "','" + discord_id + "','" + new_stat + "','" + db_maxtime + "','" + db_admin + "')");
               fs.appendFileSync("./db/users.db", "\n");
               return "Added";
           case stat_types[1]:
                fs.appendFileSync("./db/users.db", "('" + db_user + "','" + discord_id + "','" + db_level + "','" + new_stat + "','" + db_admin + "')");
                fs.appendFileSync("./db/users.db", "\n");
                return "Added";
           case stat_types[2]:
                fs.appendFileSync("./db/users.db", "('" + db_user + "','" + discord_id + "','" + db_level + "','" + db_maxtime + "','" + new_stat + "')");
                fs.appendFileSync("./db/users.db", "\n");
                return "Added";
       }
   }
}

exports.remove = function(discord_id) {
    let data = fs.readFileSync("./db/users.db", "utf8");
    let users = data.split("\n");
    let new_db = "";
    users.forEach(u => {
        if(u.includes(discord_id)) {
            
        } else if(u.length > 5) {
            new_db += u + "\n";
        }
    })

    fs.writeFileSync("./db/users.db", new_db);

    if(new_db) {
        return "User removed";
    } else {
        return "Unable to remove user";
    }
}

exports.isRegistered = function(discord_id) {
    let get_user = crud.user(discord_id, "all");
    if(get_user == "Error, Invalid stat type!" || get_user == "No user found") {
        return false;
    } else if(get_user.includes(discord_id)) {
        return true;
    } else {
        return false;
    }
}

exports.register = function(discord_name, discord_id) {
    let get_user = crud.user(discord_id, "all");
    if(get_user == "Error, Invalid stat type!" || get_user == "No user found!") {
        fs.appendFileSync("./db/users.db", "('" + discord_name + "','" + discord_id + "','0',',0','0')\n");
        return "User registered!";
    } else {
        return "User already registered!";
    }
}

exports.isPremium = function(discord_id) {
    let get_user = crud.user(discord_id, "level");
    if(get_user == "0") {
        return false;
    } else {
        return true;
    }
}
