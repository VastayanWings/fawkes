require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({intents: [3276799]});
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');

client.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


client.once(Discord.Events.ClientReady, async () => {
	console.log(`Logged in as ${client.user.tag}`);

  const rulechannel = client.channels.cache.get(config.rulechannel);
  const rolechannel = client.channels.cache.get(config.rolechannel);
  const rule_messages = await rulechannel.messages.fetch();
  const role_messages = await rolechannel.messages.fetch();
  console.log("added " + Math.abs(role_messages.size + rule_messages.size) + " messages to the cache");

	client.user.setPresence({ activities: [{ name: `ttv/vastayanwings`, type: 1, url: "https://twitch.tv/vastayanwings" }]});
});

client.on(Discord.Events.GuildMemberAdd, member => {
  console.log(member.user.tag + "joined the Server");
    
  const server = client.guilds.cache.get(config.guild_id);
  const re = /%name%/gi;
  const str = "Welcome %name% to <:vastayanwings:1032311505774981192> " + server.name + " <:vastayanwings:1032311505774981192>\nPlease check out <#1032299356226863104> to gain access to the Server.";

  const welcomemessage = str.replace(re, "<@" + member.id + ">");

  const welcomechannel = client.channels.cache.get(config.welcomechannel);
  welcomechannel.send(welcomemessage)
  .then(console.log("Welcomemessage send to " + member.user.tag));
  });



  client.on(Discord.Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    interaction.reply(".")
    .then(interaction.deleteReply());
  
    const command = interaction.client.commands.get(interaction.commandName);
   
  
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });



  client.on(Discord.Events.MessageReactionAdd, (reaction, user) => {
    const rulechannel = client.channels.cache.get(config.rulechannel);
    const rolechannel = client.channels.cache.get(config.rolechannel);
    const embersrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.embersrole);
    const streamrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.streamrole);
    const ff14role = client.guilds.cache.get(config.guild_id).roles.cache.get(config.ff14role);
    const arknightsrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.arknightsrole);
    const leaguerole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.leaguerole);
    const overwatchrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.overwatchrole);
    const minecraftrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.minecraftrole);
    const acceptrulesemote = config.acceptrulesemote;
    const streamemote = config.streamemote;
    const ff14emote = config.ff14emote;
    const minecraftemote = config.minecraftemote;
    const overwatchemote = config.overwatchemote;
    const arknightsemote = config.arknightsemote;
    const leagueemote = config.leagueemote;
 
       if (user.id == client.user.id) return;

            if (reaction.message.channel.id == rulechannel && reaction.emoji.toString() == acceptrulesemote) {
              console.log(user.tag + " reacted with " + acceptrulesemote.name);
              try
              {reaction.message.guild.members.cache.get(user.id).roles.add(embersrole)
              .then(console.log("role " + embersrole.name + " added to " + user.tag))}
              catch (error) {
                console.error(error);
              }
            } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == streamemote) {
              console.log(user.tag + " reacted with " + streamemote.name);
              try
              {reaction.message.guild.members.cache.get(user.id).roles.add(streamrole)
              .then(console.log("role " + streamrole.name + " added to " + user.tag))}
              catch (error) {
                console.error(error);
              }
            } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == ff14emote) {
              console.log(user.tag + " reacted with " + ff14emote.name);
              try
              {reaction.message.guild.members.cache.get(user.id).roles.add(ff14role)
              .then(console.log("role " + ff14role.name + " added to " + user.tag))}
              catch (error) {
                console.error(error);
              }
            } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == arknightsemote) {
              console.log(user.tag + " reacted with " + arknightsemote.name);
              try
              {reaction.message.guild.members.cache.get(user.id).roles.add(arknightsrole)
              .then(console.log("role " + arknightsrole.name + " added to " + user.tag))}
              catch (error) {
                console.error(error);
              }
            } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == leagueemote) {
              console.log(user.tag + " reacted with " + leagueemote.name);
              try
              {reaction.message.guild.members.cache.get(user.id).roles.add(leaguerole)
              .then(console.log("role " + leaguerole.name + " added to " + user.tag))}
              catch (error) {
                console.error(error);
              }
            } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == overwatchemote) {
              console.log(user.tag + " reacted with " + overwatchemote.name);
              try
              {reaction.message.guild.members.cache.get(user.id).roles.add(overwatchrole)
              .then(console.log("role " + overwatchrole.name + " added to " + user.tag))}
              catch (error) {
                console.error(error);
              }
            } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == minecraftemote) {
              console.log(user.tag + " reacted with " + minecraftemote.name);
              try
              {reaction.message.guild.members.cache.get(user.id).roles.add(minecraftrole)
              .then(console.log("role " + minecraftrole.name + " added to " + user.tag))}
              catch (error) {
                console.error(error);
              }
            }
          
  });

  client.on(Discord.Events.MessageReactionRemove, (reaction, user) => {
    const rulechannel = client.channels.cache.get(config.rulechannel);
    const rolechannel = client.channels.cache.get(config.rolechannel);
    const embersrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.embersrole);
    const streamrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.streamrole);
    const ff14role = client.guilds.cache.get(config.guild_id).roles.cache.get(config.ff14role);
    const arknightsrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.arknightsrole);
    const leaguerole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.leaguerole);
    const overwatchrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.overwatchrole);
    const minecraftrole = client.guilds.cache.get(config.guild_id).roles.cache.get(config.minecraftrole);
    const acceptrulesemote = config.acceptrulesemote;
    const streamemote = config.streamemote;
    const ff14emote = config.ff14emote;
    const minecraftemote = config.minecraftemote;
    const overwatchemote = config.overwatchemote;
    const arknightsemote = config.arknightsemote;
    const leagueemote = config.leagueemote;
 
    if (user.id == client.user.id) return;

         if (reaction.message.channel.id == rulechannel && reaction.emoji.toString() == acceptrulesemote) {
           console.log(user.tag + " removed reaction " + acceptrulesemote.name);
           try
           {reaction.message.guild.members.cache.get(user.id).roles.remove(embersrole)
           .then(console.log("role " + embersrole.name + " removed from " + user.tag))}
           catch (error) {
             console.error(error);
           }
         } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == streamemote) {
           console.log(user.tag + " removed reaction " + streamemote.name);
           try
           {reaction.message.guild.members.cache.get(user.id).roles.remove(streamrole)
           .then(console.log("role " + streamrole.name + " removed from " + user.tag))}
           catch (error) {
             console.error(error);
           }
         } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == ff14emote) {
           console.log(user.tag + " removed reaction " + ff14emote.name);
           try
           {reaction.message.guild.members.cache.get(user.id).roles.remove(ff14role)
           .then(console.log("role " + ff14role.name + " removed from " + user.tag))}
           catch (error) {
             console.error(error);
           }
         } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == arknightsemote) {
           console.log(user.tag + " removed reaction " + arknightsemote.name);
           try
           {reaction.message.guild.members.cache.get(user.id).roles.remove(arknightsrole)
           .then(console.log("role " + arknightsrole.name + " removed from " + user.tag))}
           catch (error) {
             console.error(error);
           }
         } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == leagueemote) {
           console.log(user.tag + " removed reaction " + leagueemote.name);
           try
           {reaction.message.guild.members.cache.get(user.id).roles.remove(leaguerole)
           .then(console.log("role " + leaguerole.name + " removed from " + user.tag))}
           catch (error) {
             console.error(error);
           }
         } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == overwatchemote) {
           console.log(user.tag + " removed reaction " + overwatchemote.name);
           try
           {reaction.message.guild.members.cache.get(user.id).roles.remove(overwatchrole)
           .then(console.log("role " + overwatchrole.name + " removed from " + user.tag))}
           catch (error) {
             console.error(error);
           }
         } else if (reaction.message.channel.id == rolechannel && reaction.emoji.toString() == minecraftemote) {
           console.log(user.tag + " removed reaction " + minecraftemote.name);
           try
           {reaction.message.guild.members.cache.get(user.id).roles.remove(minecraftrole)
           .then(console.log("role " + minecraftrole.name + " removed from " + user.tag))}
           catch (error) {
             console.error(error);
           }
         }
          
  });





client.login(process.env.BOT_TOKEN)
