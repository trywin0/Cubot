let logs = require("../models/logs")
const moment = require("moment")
const Discord = require("discord.js")
module.exports.run = (client, role) => {
    logs.findOne({ sid: role.guild.id }, (err, res) => {
        if (!res) return;
        if (!res.joinleave) return;
        let logChannel = role.guild.channels.cache.get(res.role)
        if (!logChannel) return;
        const createdTime = moment(role.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a')
        const joinEmbed = new Discord.MessageEmbed()
            .setColor("00E5A0")
            .setDescription(`
                        <:717437129017524324:730023160157700137> **Role deleted**

                • Name: \`${role.name}\`
                • ID: \`${role.id}\`
                • Hex color: \`${role.hexColor}\`
                • Created on: \`${createdTime}\`
                `)
        logChannel.send(joinEmbed)
    })
}