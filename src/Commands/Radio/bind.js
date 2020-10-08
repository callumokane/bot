module.exports = {
  name: 'bind',
  aliases: [],
  category: 'Radio',
  description: 'Binds Livida Radio to the following channel',
  usage: '[voice_channel ID]',
  permissions: 'MANAGE_SERVER',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: true,
  premiumOnly: false,
  requiresArgs: true,
  run: async (client, msg, args) => {
    const { RadioBindings } = require(`${process.cwd()}/src/Structures/Constants/Models.js`)
    const data = await RadioBindings.find({ guildID: msg.guild.id })
    if (data[0] && data[0].channelID === client.getChannel(msg, args[0]).id && data[0].binded) return msg.channel.send({ embed: { description: 'The bot is already bound to this channel!' } })
    if (client.getChannel(msg, args[0]).type !== 'voice') return msg.reply('the specified channel is not a voice channel!')
    var query = { channelID: client.getChannel(msg, args[0]).id, binded: true }
    RadioBindings.updateOne({ guildID: msg.guild.id }, query, { upsert: true }, function (err) {
      if (err) return msg.channel.send(err)
    })
    const embed = new client.Embed()
      .setDescription('Successfully bound the specified voice channel to the bot, when a user joins this channel, Livida will be streamed to it!')
    msg.channel.send(embed)
  }
}
