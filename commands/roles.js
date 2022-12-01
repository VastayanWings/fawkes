const Discord = require('discord.js'); 
const config = require('../config.json');

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('roles')
		.setDescription('Send a embedMessage with self-assignable Roles.')
        .setDefaultMemberPermissions('0'),
	execute(interaction) {
        const client = interaction.client;
        const rolechannel = client.channels.cache.get(config.rolechannel);
        const streamemote = config.streamemote;
        const ff14emote = config.ff14emote;
        const minecraftemote = config.minecraftemote;
        const overwatchemote = config.overwatchemote;
        const arknightsemote = config.arknightsemote;
        const leagueemote = config.leagueemote;

        const roleembed = new Discord.EmbedBuilder()
        .setColor(0x6441a5)
        .addFields(
          { name: 'Stream-Notification', value: 'If you want to get notified when the Stream goes online react with ' + streamemote + '.\n\n'},
          { name: 'Self-assignable Roles', value: 'You can self-assign the following Roles by reaction with the stated Emote:\n' + ff14emote + ' - Final Fantasy XIV\n' + arknightsemote + ' - Arknights\n' + leagueemote + ' - League of Legends\n' + overwatchemote + ' - Overwatch\n' + minecraftemote + ' - Minecraft\n'}
          )
          .setFooter({ text: 'All Roles can be removed at any time by deleting the Reaction.'});
      
      rolechannel.send({ embeds: [roleembed]})
      .then(console.log("embedMessage send in channel " + rolechannel.name))
      .then(function (message) {
        message.react(streamemote)
        .then(() => message.react(ff14emote))
        .then(() => message.react(arknightsemote))
        .then(() => message.react(leagueemote))
        .then(() => message.react(overwatchemote))
        .then(() => message.react(minecraftemote))})
      .then(console.log("Reactions added to send embedMessage"));


	}
};
