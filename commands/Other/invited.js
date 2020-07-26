const inviteTracker = require("../../models/inviteTracker")
const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "invited",
    description: "Check who someone was invited to the server by",
    run: (client, message, args) => {
        if (!message.mentions.members.first()) return message.channel.send(argsEmbed("invited @user"))
        inviteTracker.findOne({ sid: message.guild.id, user: message.mentions.members.first().id }, async(err, res) => {
            if (err) console.log(err)
            if (!res) return message.channel.send(redEmbed("I couldn't find who invited that user in our database"))
            let invitedby = await client.users.fetch(res.invitedby).catch(console.log)
            message.channel.send(greenEmbed(`${message.mentions.members.first().user.tag} was invited by ${invitedby.tag}`))
        })
    }
}