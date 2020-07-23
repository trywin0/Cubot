let logs = require("../models/logs")
const Discord = require("discord.js");
const { co } = require("@vitalets/google-translate-api/languages");
module.exports.run = (client, oldMember, newMember) => {
    let changes = [];
    if (oldMember.displayName != newMember.displayName) {
        changes.push(`• Updated nickname: \`${oldMember.displayName}\`->\`${newMember.displayName}\``)
    }
    if (oldMember.roles.cache.map(m => m) != newMember.roles.cache.map(m => m)) {
        let removed = oldMember.roles.cache.map(m => m).filter(role => !newMember.roles.cache.map(m => m).includes(role))
        let added = newMember.roles.cache.map(m => m).filter(role => !oldMember.roles.cache.map(m => m).includes(role))
        if (removed.length) {
            changes.push(`• Role removed: ${removed}`)
        }
        if (added.length) {
            changes.push(`• Role added: ${added}`)
        }
    }
    if (changes.length < 1) return;
    logs.findOne({ sid: newMember.guild.id }, (err, res) => {
        if (!res) return;
        if (!res.member) return;
        let logChannel = newMember.guild.channels.cache.get(res.member)
        if (!logChannel) return;
        const joinEmbed = new Discord.MessageEmbed()
            .setColor("00E5A0")
            .setDescription(`
                        <:717437129017524324:730023160157700137> **Member updated**

                        • Member: ${newMember}
                        ${changes.join("\n")}
    `)
            .setFooter(`
    Member ID: ${newMember.id}`)
        logChannel.send(joinEmbed)
    })
}