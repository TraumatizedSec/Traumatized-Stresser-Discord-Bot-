const fs = require("fs");
const config = require("./config.js");
const crud = require("./crud.js");

exports.BotInfo = {
    "Prefix": ">",
    "Name": "Traumatized Stress",
    "Description": "Discord's Best DDOS BOT OUT",
    "Version": "1.00",
    "Bot_Invite": "https://discord.com/api/oauth2/authorize?client_id=798653553799200798&permissions=8&scope=bot",
    "Server_Invite": "https://discord.gg/XuZNExsZjg",
    "Creators": "GDKScrapy, draco",
    "Token": "Nzk4NjUzNTUzNzk5MjAwNzk4.X_4KFQ.Tf0Gl5hI3-tUa4WoVXiqyj2hYiA"
}

exports.Creator = {
    "Name": "su",
    "Discord": "su#9374",
    "DiscordID": "804028011639996436",
    "Instagram": "@GDKScrapy",
    "Twitter": "@GDKScrapy",
    "Server": "https://scrapy.tech/discord",
    "Site": "https://scrapy.tech/"
}

exports.Colors = {
    "Red": "\x1b[31m",
    "Blue": "\x1b[34m",
    "Purple": "\x1b[35m",
    "Cyan": "\x1b[96m",
    "Green": "\x1b[32m",
    "Black": "\x1b[30m",
    "Reset": "\x1b[39m"
}


exports.CurrentMSG = {
    "Cmd": "",
    "Fullmsg": "",
    "arg": []
}

exports.CurrentUser = {
    "Discord_name": "",
    "Discord_id": "",
    "Level": "",
    "Maxtime": "",
    "Admin": ""
}

exports.CurrentServer = {
    "Server_name": "",
    "Server_id": "",
    "Channel_name": "",
    "Channel_id": "",
}

exports.GetUserStats = function(discord_id) {
    let get_info = crud.user(discord_id, "all");
    let info = get_info.split(",");
    config.CurrentUser.Level = info[2];
    config.CurrentUser.Maxtime = info[3];
    config.CurrentUser.Admin = info[4];
}
























































exports.BOOTERAPI = "https://45.143.138.112/api.php?host=";
exports.BOOTERAPI1 = "https://45.143.138.137/api.php?host=";
exports.BOOTERAPI2 = "https://zeus-net.pw/panel/api/?totalservers=1&username=Yazhrod&key=lvgxp6e!cexm8i09p1d77wawh4fh9!abcffyic&host="