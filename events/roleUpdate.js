let logs = require("../models/logs")
const Discord = require("discord.js")
module.exports.run = (client, oldRole, newRole) => {
    if (newRole.id != oldRole.id) return;
    let change = ""
    if (oldRole.name != newRole.name) {
        change += `\n• Updated name: \`${oldRole.name}\`->\`${newRole.name}\``
    }
    if (oldRole.color != newRole.color) {
        change += `\n• Updated color: \`${oldRole.hexColor}\`->\`${newRole.hexColor}\``
    }
    if (change == "") return;
    logs.findOne({ sid: newRole.guild.id }, (err, res) => {
        if (!res) return;
        if (!res.joinleave) return;
        let logChannel = newRole.guild.channels.cache.get(res.role)
        if (!logChannel) return;
        const joinEmbed = new Discord.MessageEmbed()
            .setColor("00E5A0")
            .setDescription(`
                        <:717437129017524324:730023160157700137> **Role updated**

                        • Role: ${newRole}${change}
    `)
            .setFooter(`
    Role  ID: ${newRole.id}`)
        logChannel.send(joinEmbed)
    })
}