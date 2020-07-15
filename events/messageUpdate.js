const logs = require("../models/logs")
const Discord = require("discord.js")

exports.run = (client, oldMessage, newMessage) => {
    if (oldMessage.content == newMessage.content) return;
    console.log(`
    ____ Edited message ___
    ${oldMessage.author.tag} : 
    Old message: ${oldMessage.content}
    New message: ${newMessage.content}
    _______________________`)
    logs.findOne({ sid: oldMessage.guild.id }, (err, res) => {
        if (!res) return;
        if (!res.edit) return;
        let logChannel = oldMessage.guild.channels.cache.get(res.edit)
        if (!logChannel) return;
        const editEmbed = new Discord.MessageEmbed()
            .setColor("00E5A0")
            .setDescription(`
                        <:717437129017524324:730023160157700137> **Edited message**
            [Go to message](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})
            Author: ${oldMessage.author.tag}
            Channel: ${oldMessage.channel}
            `)
            .setFooter(`
            Author ID: ${oldMessage.author.id}
Message ID: ${oldMessage.id}`)
            .addField("Old message", `\`\`\` ${oldMessage.content}\`\`\``, true)
            .addField("New message", `\`\`\` ${newMessage.content}\`\`\``, true)
            .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true, format: "png" }))
        logChannel.send(editEmbed)
    })
}