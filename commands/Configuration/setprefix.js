const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const prefix = require("../../models/prefix")
module.exports = {
    name: "setprefix",
    accessibleto: 1,
    run: (client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permEmbed("ADMINISTRATOR"))
            prefix.findOne({ sid: message.guild.id }, (err, res) => {
                if (err) console.log(err)
                if (!res) {
                    let newprefix = prefix.create({ sid: message.guild.id, prefix: args[0] })
                } else {
                    res.prefix = args[0]
                    res.save()
                }

                message.channel.send(greenEmbed(`Successfully changed server prefix to ${args[0]}`))
            })
        } catch (e) {
            console.log(e)
            message.channel.send(errorEmbed(e))
        }
    }
}