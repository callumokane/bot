module.exports = {
  name: 'volume',
  aliases: ['vol'],
  category: 'Music',
  description: 'Change the volume or check the current volume',
  usage: '<input>',
  permissions: 'SEND_MESSAGES',
  clientPerms: 'SEND_MESSAGES',
  creatorOnly: true,
  guildOnly: true,
  premiumOnly: false,
  run: async (client, msg, args) => {
    const player = client.music.players.get(msg.guild.id)
    if (!player) return msg.channel.send(new client.Embed().error('There is nothing playing!'))
    const { channel } = msg.member.voice
    if (channel.id !== player.voiceChannel.id || !channel) return msg.channel.send(new client.Embed().error('You are not in the same voice channel as me!'))
    if (!args[0]) return msg.channel.send(`Current volume: **${player.volume}**`)
    if (Number(args[0]) <= 0) return msg.channel.send(new client.Embed().error('You cannot set the volume to 0! Try using `leave` or `pause` to make me stop!'))
    if (Number(args[0]) > 100) return msg.channel.send(new client.Embed().error('You may not set the volume to more than 100!'))

    player.setVolume(Number(args[0]))

    return msg.channel.send(new client.Embed().success(`Changed the volume to **${args[0]}**!`))
  }
}
