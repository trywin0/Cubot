const logs = require("../models/logs")
const Discord = require("discord.js")

exports.run = (client, deletedMessage) => {
        console.log(`
    ___ Deleted message ___
    ${deletedMessage.author.tag} : ${deletedMessage.content}
    _______________________`)
        const truncate = (input) => input.length > 1800 ? `${input.substring(0, 1800)}...` : input;
        logs.findOne({ sid: deletedMessage.guild.id }, (err, res) => {
                    if (!res) return;
                    if (!res.delete) return;
                    let logChannel = deletedMessage.guild.channels.cache.get(res.delete)
                    if (!logChannel) return;
                    const deletionEmbed = new Discord.MessageEmbed()
                        .setColor("00E5A0")
                        .setDescription(`
                        <:717437129017524324:730023160157700137> **Deleted message**
            
            Author: ${deletedMessage.author.tag}
            Channel: ${deletedMessage.channel}
            Message: \`\`\`${deletedMessage.content?truncate(deletedMessage.content):"  "}\`\`\`
            ${deletedMessage.attachments.size != 0?`Attachment(s): ${deletedMessage.attachments.map(attachment=>`[${attachment.name}](${attachment.url})`).join(", ")}`:""}
            `)
            .setFooter(`
            Author ID: ${deletedMessage.author.id}
Message ID: ${deletedMessage.id}`)
            .setThumbnail(deletedMessage.author.displayAvatarURL({ dynamic: true, format: "png" }))
            logChannel.send(deletionEmbed)
    })
}