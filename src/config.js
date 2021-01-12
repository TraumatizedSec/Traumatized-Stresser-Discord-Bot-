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
    "Token": "Nzk4NjUzNTUzNzk5MjAwNzk4.X_4KFQ.60TZ3sD-hN6pKjNS7j7L2_7XL2U"
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