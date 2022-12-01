const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
	data: new Discord.SlashCommandBuilder()
		.setName('rules')
		.setDescription('Send the embedMessage with the Rules.')
        .setDefaultMemberPermissions('0'),
	execute(interaction) {
        const client = interaction.client;
        const trigardon = new Discord.AttachmentBuilder('./trigardon.jpg', { name: 'trigardon.jpg' });
        const rulechannel = client.channels.cache.get(config.rulechannel);
        const acceptrulesemote = config.acceptrulesemote;

        const rules = new Discord.EmbedBuilder()
        .setColor(0xe80e24)
        .setTitle('Rules')
        .setDescription('The Rules of the Server and Stream')
        .setThumbnail('attachment://trigardon.jpg')
        .addFields( 
          { name: '\u200B', value: '① Keep the language in this Server in English.\n[Small Chats in other languages can be tolerated]' },
          { name: '\u200B', value: '② No Flaming or Harassing of others.\nTreat others like you want to be treated yourself.'},
          { name: '\u200B', value: '③ Hate Speech in any form will absolutely not be tolerated!\n[Doing so will result in a Ban!]'},
          { name: '\u200B', value: '④ No NSFW on this Server at all!\n[There will be no NSFW-Channel]' },
          { name: '\u200B', value: '⑤ Try to keep Posts and Chats to their corresponding Channels.\n[More a Plea than an actual Rule]' },
          { name: '\u200B', value: '⑥ Do not post Links to other Discord-Servers or Streams.\nYou can use <#1032298016356433980> to promote your own Stream/YouTube [NO DISCORD-LINKS].' },
          { name: '\u200B', value: '⑦ For anything not covered common sense applies.\nAdmin/Mods have the last word in those cases!' },
          { name: '\u200B', value: 'React with ' + acceptrulesemote + ' to accept the rules and to gain access to the Server.'}
          )
          .setFooter({ text: 'Rules are subject to change'});
      
      rulechannel.send({ embeds: [rules], files: [trigardon] })
      .then(console.log("embedMessage send in channel " + rulechannel.name))
      .then(embedMessage => {embedMessage.react(acceptrulesemote)})
      .then(console.log("Reaction added to send embedMessage"));

	}
};
