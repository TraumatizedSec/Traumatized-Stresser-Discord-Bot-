const fs = require("fs");

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