const { Utils } = require("erela.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "currenttrack", "current"],
    category: "Music",
    description: "Check what the current song is",
    usage: "",
    permissions: "SEND_MESSAGES",
    clientPerms: "SEND_MESSAGES",
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    run: async (client, msg, args) => {
        const player = client.music.players.get(msg.guild.id);
        if (!player || !player.queue[0]) return msg.channel.send(new client.Embed().error(`No songs currently playing within this server!`));

        let embed = new client.Embed()
            .setTitle('Coming Soon')
        msg.channel.send(embed)  
    }
};