const Discord = require('discord.js');
const client = new Discord.Client();

//Bot on ready

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!\nServer Count: ${client.guilds.size}`);
  client.user.setPresence({ game: { name: `the bot is working`, type: 'WATCHING' }, status: 'online' });
});

//Command handler

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
});


  
client.login('VERY-SECRET-TOKEN');