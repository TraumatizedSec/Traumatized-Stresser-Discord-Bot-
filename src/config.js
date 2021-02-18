const fs = require("fs");
const config = require("./config.js");
const crud = require("./crud.js");

exports.BotInfo = {
    "Prefix": ";",
    "Name": "Pandemic",
    "Description": "In a land with packet launchers!",
    "Version": "1.00",
    "Bot_Invite": "https://discord.com/api/oauth2/authorize?client_id=812086626457092118&permissions=8&scope=bot",
    "Server_Invite": "https://discord.gg/Mq6aGh2EVj",
    "Creators": "n4n0 | King Larry",
    "Token": "ODEyMDg2NjI2NDU3MDkyMTE4.YC7omw.lse8TSfZxEpSRZ7jKR48RsB5PeY"
}

exports.Creator = {
    "Name": "n4n0",
    "Discord": "n4n0#2100",
    "DiscordID": "806100698135396372",
    "Instagram": "@Preauthorize",
    "Server": "https://CodeTheWorld.xyz/discord",
    "Site": "https://codetheworld.xyz/"
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
























































exports.BOOTERAPI = "http://5.255.97.103/skid.php?host=";