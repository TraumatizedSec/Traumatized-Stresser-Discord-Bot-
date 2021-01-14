const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();
const config = require("./src/config.js");
const crud = require("./src/crud.js");
const extra = require("./src/extra.js");

//Bot on ready.

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!\nServer Count: ${client.guilds.size}`);
  client.user.setActivity("Traumatized");
  //client.user.setPresence({ game: { name: `the bot is working`, type: 'WATCHING' }, status: 'online' });
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
      // sendmsg("Help", "Help | Shows The List Of Commands\nMethods | Shows The List Of Methods\nCredits | Shows The Creators\n\n**Tools**\nGeo | Shows The Details Of An Ip Address\nPscan | Shows The Common Ports\n\n**Admin Commands**\nAddusr | Adds A User To The Database\nRemoveusr | Removes A User From The Database\nUpgradeusr | Upgrades A Users Plan")
      help();
    } else if(message.content.startsWith(config.BotInfo.Prefix + "test")) {
      if(crud.isAdmin(config.CurrentUser.Discord_id)) { 
        bootembed("1.1.1.1", "80", "30", "LDAP", "Sent", "1/13/21-8:00pm");
      } else {
        sendmsg("Error", "Admin only command!");
      }
    } else if(message.content.startsWith(config.BotInfo.Prefix + "myinfo")) {
      let get_info = crud.user(config.CurrentUser.Discord_id, "all");
      let info = get_info.split(",");
      sendmsg("My Info", "```User: " + info[0] + " | ID: " + info[1] + "\nLevel: " + info[2] + " | Maxtime: " + info[3] + " | Admin: " + info[4] + "```");
    } else if(message.content.startsWith(config.BotInfo.Prefix + "geo")) {
      ip = config.CurrentMSG.arg[1];
      if(message.content == config.BotInfo.Prefix + "geo") {
         sendmsg("Error", "Missing arguments!\nUsage: geo <ip>\nExmaple: geo 5.5.5.5");
      } else {
        sendmsg("Geo", extra.geo(ip));
        // fetch("https://scrapy.tech/tools/?action=geoip&q=" + ip).then(res => res.text()).then(body => {
        //   sendmsg("Geo", body);
        // });
      }
    } else if(message.content.startsWith(config.BotInfo.Prefix + "pscan")) {
      ip = config.CurrentMSG.arg[1];
      if(message.content.split(" ").length < 1) {
        sendmsg("Error", "Missing arguments\nUsage: " + config.BotInfo.Prefix + "pscan <ip>");
      } else {
        fetch("https://scrapy.tech/tools/?action=pscan&q=" + ip).then(res => res.text()).then(body => {
          sendmsg("Pscan", body);
        });
      }
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
      let ip = config.CurrentMSG.arg[1];
      let port = config.CurrentMSG.arg[2];
      let time = config.CurrentMSG.arg[3];
      let method = config.CurrentMSG.arg[4];
      if(message.content.split(" ").length < 4) {
        sendmsg("Error", "Missing arguments\nUsage: " + config.BotInfo.Prefix + "stress <ip> <port> <time>");
      } else {
        fetch("api" + ip + "&port=" + port + "&time=" + time + "&method=" + method).then(res => res.text()).then(body => {
          if(body.toLowerCase().includes("attack sent")) {
            sendmsg("Attack Status", "Sent")
          }
        });
      }
    } else if(message.content.startsWith(config.BotInfo.Prefix + "removeusr")) {
      let tool = config.CurrentMSG.arg[1];
      let user_id = config.CurrentMSG.arg[2];
      let stat = config.CurrentMSG.arg[3];
      let new_str = config.CurrentMSG.arg[4];
      if(crud.isAdmin(message.author.id) == true) {
        if(tool == "update") {
          sendmsg("User update", crud.update(user_id, stat, new_str));
        }
      } else {
        sendmsg("Admin", "You must be a admin to use this command!")
      }
    }
  } else if(message.content.startsWith(config.BotInfo.Prefix + "register")) {
      message.channel.send(crud.register(message.author.tag, message.author.id))
  } else if(message.content.startsWith(config.BotInfo.Prefix)) {
      sendmsg("Error", "You aren't registered")
      //message.channel.send("Error, You aren't registered ");
  }

  function sendmsg(titlel, descriptionl) {
    const embed = new Discord.MessageEmbed()
        embed.setColor(16711680)
        embed.setTitle(config.BotInfo.Name + " | " + titlel)
        embed.setDescription(descriptionl)
        embed.setFooter('Traumatized | Created & Developed By: Traumatized Security | Main Server: ' + config.BotInfo.Server_Invite)
    message.channel.send(embed)
  }

  function help() 
  {
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(config.BotInfo.Name + " | List of commands")
      .setDescription('Format: \n - Command/Info\n - Command Usage')
      .addFields(
        { name: 'Info | BOT Info', value: config.BotInfo.Prefix + 'info' },
		  //{ name: '\u200B', value: '\u200B' },
        { name: 'Help | Command list', value: config.BotInfo.Prefix + 'help'},
	    	{ name: 'GeoIP | IP Location', value: config.BotInfo.Prefix + 'geo <method(all/isp)> <ip>'},
	    	{ name: 'Port Scan | Grab open ports on a IP', value: config.BotInfo.Prefix + 'pscan <ip>'},
	    	{ name: 'Prices | Bot plans and link to buy now!', value: config.BotInfo.Prefix + 'prices'},
	    	{ name: 'Methods | List of methods for premium users', value: config.BotInfo.Prefix + 'methods'},
	    	{ name: 'Bot Invite | Invite this bot to your server', value: config.BotInfo.Prefix + 'bot_inv'},
	    	{ name: "Traumatized's Server | Traumatized's Personal Server Invite", value: config.BotInfo.Prefix + 'myinvite'},
	    	{ name: "About | Credits and contact info", value: config.BotInfo.Prefix + 'credits'},
	    	{ name: '\u200B', value: '\u200B' },
	    	{ name: 'Admin | List of admin commands', value: config.BotInfo.Prefix + 'admincp'})
	    .setFooter(config.BotInfo.Name + ` | Created & Developed By: Traumatized Security | Main Server: ` + config.BotInfo.Server_Invite, 'https://scrapy.tech/image0.png');

        message.channel.send(exampleEmbed);
  }

  function bootembed(ip, p, t, m, status, timestamp) {
      const exampleEmbed = new Discord.MessageEmbed()
	    .setColor('#0099ff')
	    .setTitle(config.BotInfo.Name + " | Attack Status")
	    .addFields(
		    // { name: 'Regular field title', value: 'Some value here' },
		    // { name: '\u200B', value: '\u200B' },
	    	{ name: 'IP', value: ip, inline: true },
	    	{ name: 'Port', value: p, inline: true },
	    	{ name: 'Time', value: t, inline: true },
	    	{ name: 'Method', value: m, inline: true },
	    	{ name: 'Status', value: status, inline: true },
	    	{ name: 'Timestamp', value: timestamp, inline: true },
    	)
    	.setImage('https://media1.giphy.com/media/11Ad7FqUiNMRAA/giphy.gif')
    	.setTimestamp()
    	.setFooter(config.BotInfo.Name + ` | Created & Developed By: Traumatized Security | Main Server: ` + config.BotInfo.Server_Invite, 'https://scrapy.tech/image0.png');

    message.channel.send(exampleEmbed);
  }
});

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


client.login(config.BotInfo.Token);