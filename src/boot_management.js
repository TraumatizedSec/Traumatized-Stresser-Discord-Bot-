const fs = require("fs");
const crud = require("./crud.js");
const config = require("./config");

exports.get_apis = function() {
<<<<<<< Updated upstream
    let db = fs.readFileSync("../db/apis.db", "utf8");
    let apis = db.split("\n");
    apis.forEach(a => {
        if(a.length > 5) {
            let api = a.split("|");
            console.log(api[0]);
        }
=======
    let db = fs.readFileSync("../db/users.db", "utf8");
    let apis = db.split("\n");
    apis.forEach(a => {
        let api = a.split("|")[0];
        console.log(api);
>>>>>>> Stashed changes
    })
}