const fs = require("fs");
const f = require("node-fetch");


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

exports.geo = async ip => {
    try {
      const response = await f("https://scrapy.tech/tools/?action=geoip&q=" + ip);
      const json = await response.text();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
};

exports.pscan = async ip => {
    try {
        const response = await f("https://scrapy.tech/tools/?action=portscan&q=" + ip);
        const json = await response.text();
        console.log(json);
        return json;
      } catch (error) {
        console.log(error);
      }
}

exports.test = async function(ip) {
    const r = await f("https://scrapy.tech/tools/?action=geoip&q=" + ip);
    const g = r.text().toString();
    console.log(g);
    return g;
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