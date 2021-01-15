const fs = require("fs");
const f = require("node-fetch");

const config = require("./config.js");
const extra = require("./extra.js");

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

exports.logger = function(msg_type) { 
    let logthis = "";
    switch(msg_type) {
        case "cmd":
            logthis = config.Colors.Red;
            break;
        case "msg":
            logthis = config.Colors.Cyan;
            break;
    }
    logthis += "# [ NEW LOG ] #\r\n";
    logthis += "[MSG/CMD]: " + msg_type + "\r\n";
    logthis += "[User]: " + config.CurrentUser.Discord_name + " | [User ID]: " + config.CurrentUser.Discord_id + "\r\n";
    logthis += "[Server]: " + config.CurrentServer.Server_name + " | [Server ID]: " + config.CurrentServer.Server_id + "\r\n";
    logthis += "[Channel]: " + config.CurrentServer.Channel_name + " | [Channel ID]: " + config.CurrentServer.Channel_id + "\r\n";
    logthis += "[MSG]: " + config.CurrentMSG.Fullmsg + config.Colors.Reset + "\r\n\r\n";
    extra.log_file(logthis);
    console.log(logthis);
}

exports.log_file = function(data) {
    fs.appendFileSync("./db/logs.db", data + "\n");
}


exports.in_between = function(str, first_token, second_token) {
    let split = str.split('');
    let gay = str.length;
    let add_t = false;
    let new_str = "";
    let o = 0;
    for(o = 0; o <= gay; o++) {
        if(split[o] === first_token) {
            add_t == true;
        } else if(split[o] === second_token) {
            add_t = false;
        } else if(add_t === true) {
            // new_str += split[o];
            console.log(split[o]);
        }
    }
    return new_str;
}

exports.removestr = function(str, rm_str) {
    return str.split(rm_str).join("");
}

exports.currentTime = function() {
    let current = new Date();
    return current.getMonth()+1 + "/" + current.getDate() + "/" + current.getFullYear()
}