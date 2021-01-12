const fs = require("fs");
const crud = require("./crud.js");
const config = require("./config");

exports.get_apis = function() {
    let db = fs.readFileSync("../db/users.db", "utf8");
    let apis = db.split("\n");
    apis.forEach(a => {
        let api = a.split("|")[0];
        console.log(api);
    })
}