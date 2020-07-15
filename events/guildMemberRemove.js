const logs = require("../models/logs")
const inviteTracker = require("../models/inviteTracker")
const Discord = require("discord.js")
const moment = require("moment")
exports.run = async(client, member) => {
        console.log(`
    ___ Member left _____
    ${member.user.tag} left ${member.guild.name}
    _______________________`)
        logs.findOne({ sid: member.guild.id }, (err1, res1) => {
                    if (err1) console.log(err1)
                    if (!res1) return;
                    if (!res1.joinleave) return;
                    let logChannel = member.guild.channels.cache.get(res1.joinleave)
                    if (!logChannel) return;
                    inviteTracker.findOne({ sid: member.guild.id, user: member.id }, async(err, res) => {
                                if (err) console.log(err)
                                let inviter = res ? await client.users.fetch(res.invitedby).catch(console.log) : undefined
                                const joinEmbed = new Discord.MessageEmbed()
                                    .setColor("RED")
                                    .setDescription(`
                        <:717436253402038333:730022245593776188> **Member left**

            Member: ${member}
            Joined server date: ${moment(member.joinedTimestamp).format('MMMM Do YYYY, h:mm:ss a')}
            Account creation date: ${moment(member.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a')}
            ${inviter?`Invited by: ${inviter.tag}`:""}
            `)
            .setFooter(`
            Member ID: ${member.id}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png" }))
        logChannel.send(joinEmbed)
                    })

    })
}