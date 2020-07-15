const logs = require("../models/logs")
const inviteTracker = require("../models/inviteTracker")
const Discord = require("discord.js")
let invites = require("./ready").invites
const moment = require("moment")
exports.run = async(client, member) => {
        let guildInvites = await member.guild.fetchInvites().catch(e => console.log(e))
        const ei = invites[member.guild.id];
        let invite = undefined
        let inviter = undefined
        if (ei) {
            invites[member.guild.id] = guildInvites;
            if (!guildInvites) return;
            invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
            inviter = client.users.cache.get(invite.inviter.id);
            inviteTracker.findOne({ sid: member.guild.id, user: member.id }, (err, res) => {
                if (err) console.log(err)
                if (!res) {
                    inviteTracker.create({ sid: member.guild.id, user: member.id, invitedby: inviter.id })
                } else {
                    res.invitedby = inviter.id
                    res.save()
                }
            })
        }
        console.log(`
    ___ Member joined _____
    ${member.user.tag} joined ${member.guild.name} using invite link ${invite}
    _______________________`)
        const truncate = (input) => input.length > 1800 ? `${input.substring(0, 1800)}...` : input;
        logs.findOne({ sid: member.guild.id }, (err, res) => {
                    if (!res) return;
                    if (!res.joinleave) return;
                    let logChannel = member.guild.channels.cache.get(res.joinleave)
                    if (!logChannel) return;
                    const joinEmbed = new Discord.MessageEmbed()
                        .setColor("00E5A0")
                        .setDescription(`
                        <:717436253402038333:730022245593776188> **Member joined**

            Member: ${member}
            Account creation date: ${moment(member.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a')}
            Member number: ${member.guild.memberCount}
            ${inviter?`Invited by: ${inviter.tag}`:""}
            ${inviter?`Used invite link: ${invite}`:""}
            `)
            .setFooter(`
            Member ID: ${member.id}`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png" }))
        logChannel.send(joinEmbed)
    })
}