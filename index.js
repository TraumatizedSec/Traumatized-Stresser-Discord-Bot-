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

  config.CurrentServer.Server_name = message.guild.name;
  config.CurrentServer.Server_id = message.guild.id;
  config.CurrentServer.Channel_name = message.guild.name;
  config.CurrentServer.Channel_id = message.guild.id;


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

  if(crud.isRegistered(config.CurrentUser.Discord_id)) {
    //YOU CANT START MAKING COMMANDS HERE
    if(message.content.startsWith(config.BotInfo.Prefix + "help")) { //FIRST COMMAND!
      sendmsg("Help", "Help | Shows The List Of Commands\nMethods | Shows The List Of Methods\n\n**Tools**\nGeo | Shows The Details Of An Ip Address\nPscan | Shows The Common Ports\n\n**Admin Commands**\nAddusr | Adds A User To The Database\nRemoveusr | Removes A User From The Database\nUpgradeusr | Upgrades A Users Plan")
    } else if(message.content.startsWith(config.BotInfo.Prefix + "geo")) {
      ip = config.CurrentMSG.arg[1];
      fetch("https://scrapy.tech/tools/?action=geoip&q=" + ip).then(res => res.text()).then(body => {
        sendmsg("Geo", body);
      });
    } else if(message.content.startsWith(config.BotInfo.Prefix + "pscan")) {
      ip = config.CurrentMSG.arg[1];
<<<<<<< Updated upstream
      fetch("https://scrapy.tech/tools/?action=pscan&q="+ip).then(res => res.text()).then(body => {
        sendmsg("Pscan", body);
=======
      fetch("https://scrapy.tech/tools/?action=pscan&q=" + ip).then(res => res.text()).then(body => {
        sendmsg("Geo", body);
>>>>>>> Stashed changes
      });
    } else if(message.content.startsWith(config.BotInfo.Prefix + "methods")) {
      fetch("https://scrapy.tech/methods.txt").then(res => res.text()).then(body => {
        if(!body) {
          sendmsg("Error", "Unable to get methods (LIVE)");
        } else {
          sendmsg("Methods", body);
        }
      });
    } else if(message.content.startsWith(config.BotInfo.Prefix + "credits")) {
      sendmsg("Credits", "**Traumatized Security Team**\n\n**draco Social Media**\nInstagram | bizivix\nDiscord | draco#3024\n**GDK Scrapy Social Media**\nInstagram | gdkscrapy\nDiscord | GDK Scrapy#9431\n**WhosGotFrost Social Media**\nInstagram | whosgotfrost\nDiscord | WhosGotFrost#8041\n**Lag oh ye Social Media**\nDiscord | Lag oh ye#0001")
    } else if(message.content.startsWith(config.BotInfo.Prefix + "stress")) {
      ip = config.CurrentMSG.arg[1];
      fetch("https://scrapy.tech/tools/?action=pscan&q=" + ip).then(res => res.text()).then(body => {
        pscan(body);
      });
    }
  } else if(message.content.startsWith(config.BotInfo.Prefix + "register")) {
      message.channel.send(crud.register(message.author.tag, message.author.id))
  } else if(message.content.startsWith(config.BotInfo.Prefix)) {
      message.channel.send("Error, You aren't registered ");
  }

  function sendmsg(titled, descriptiond) {
    message.channel.send({embed: {
        color: 16711680,
        title: config.BotInfo.name + " | "  + titled,
        description: descriptiond,
        footer: { text: `Traumatized | Created & Developed By: Traumatized Security | Main Server: ttps://discord.gg/9CAqV29Mjd`}
    }});
  }
});

client.login(config.BotInfo.Token);