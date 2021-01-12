const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./src/config.js");
const crud = require("./src/crud.js");

//Bot on ready

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!\nServer Count: ${client.guilds.size}`);
  client.user.setPresence({ game: { name: `the bot is working`, type: 'WATCHING' }, status: 'online' });
});

//Command handler

client.on('message', async (message) => {

  config.CurrentUser.Discord_id = message.author.id;

  if(message.author.bot) return;
  if(message.content.startsWith(config.BotInfo.Prefix)) {
    let split = message.content.split(" ");
    let i = 0;
    split.forEach(e => {
      config.CurrentMSG.arg[i] = e;
      i++;
    })
    config.CurrentMSG.Cmd = config.CurrentMSG.arg[0].replace(config.BotInfo.Prefix, "");
    //LOG COMMAND
  } else {
    //LOG MESSAGE
  }

  if(crud.isRegistered(config.BotInfo.Discord_id)) {
    //YOU CANT START MAKING COMMANDS HERE
    if(message.content.startsWith(config.BotInfo.Prefix + "help")) { //FIRST COMMAND!

    }
  } else if(message.content.startsWith(config.BotInfo.Prefix + "register")) {

  } else if(message.channel.startsWith(config.BotInfo.Prefix)) {
    message.channel.send("Error, You aren't registered ");
  }
});


  
client.login(config.BotInfo.Token);