const fs = require("fs");
const crud = require("./crud.js");
const config = require("./config");

exports.get_apis = function() {
    let db = fs.readFileSync("../db/apis.db", "utf8");
    let apis = db.split("\n");
    apis.forEach(a => {
        if(a.length > 5) {
            let api = a.split("|");
            console.log(api[0]);
        }
    })
}