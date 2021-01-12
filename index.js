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
  if (message.author.bot) return;
  if (message.content.startsWith(config.prefix)) {
    let split = message.content.split(" ");
    let i = 0;
    split.forEach(e => {
      config.CurrentMSG.arg[i] = e;
      i++;
    })
    config.CurrentMSG.Cmd = config.CurrentMSG.arg[0].replace(config.BotInfo.Prefix);
    //LOG COMMAND
  } else {
    //LOG MESSAGE
  }

  if(crud.isRegistered(config.CurrentUser.Discord_id)) {
    if(config.CurrentMSG.Cmd == "")

  } else if(message.content == config.BotInfo.prefix + "register") {
    //REGISTER FUNCTION HERE
  } else {
    message.channel.send("Error, you aren't registered to use this bot. In order to register type ``" + config.prefix + "register``!!")
  }

});


function sendmsg(titled, descriptiond) {
  message.channel.send({embed: {
      color: 16711680,
      title: "Traumatized | "  + titled,
      description: descriptiond,
      footer: { text: `Traumatized | Created & Developed By: Traumatized Security | Main Server: ttps://discord.gg/9CAqV29Mjd`}
    }
  });
}

var DORKAPI = "";
  
client.login(config.BotInfo.Token);