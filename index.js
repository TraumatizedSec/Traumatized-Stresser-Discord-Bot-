const Discord = require('discord.js');
const fetch = require("node-fetch");
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

  config.CurrentUser.Discord_name = message.author.tag;
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
      help();
    } else if(message.content.startsWith(config.BotInfo.Prefix + "geo")) {
      ip = config.CurrentMSG.arg[2];
      fetch("https://scrapy.tech/tools/?action=geoip&q="+ip).then(res => res.text()).then(body => {
        geo(body);
      });
    } else if(message.content.startsWith(config.BotInfo.Prefix + "pscan")) {
      ip = config.CurrentMSG.arg[2];
      fetch("https://scrapy.tech/tools/?action=pscan&q="+ip).then(res => res.text()).then(body => {
        pscan(body);
      });
    } else if(message.content.startsWith(config.BotInfo.Prefix + "methods")) {
      fetch("https://scrapy.tech/methods.txt").then(res => res.text()).then(body => {
        sendmsg("Methods", body);
      });
    } else if(message.content.startsWith(config.BotInfo.Prefix + "stress")) {
      ip = config.CurrentMSG.arg[2];
      fetch("https://scrapy.tech/tools/?action=pscan&q="+ip).then(res => res.text()).then(body => {
        pscan(body);
      });
      
      attackmsg();
    }
  } else if(message.content.startsWith(config.BotInfo.Prefix + "register")) {
      message.channel.send(crud.register())
  } else if(message.channel.startsWith(config.BotInfo.Prefix)) {
      message.channel.send("Error, You aren't registered ");
  }

  function sendmsg(titled, descriptiond) {
    message.channel.send({embed: {
        color: 16711680,
        title: "Traumatized | "  + titled,
        description: descriptiond,
        footer: { text: `Traumatized | Created & Developed By: Traumatized Security | Main Server: ttps://discord.gg/9CAqV29Mjd`}
    }});
  }
});



var API1 = "";
  
client.login(config.BotInfo.Token);