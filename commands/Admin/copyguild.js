const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const serverCopy = require("../../models/serverCopy")

module.exports = {
    name: "serverCopy",
    accessibleto: 1,
    run: (client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permEmbed("ADMINISTRATOR"))
        } catch (e) {
            console.log(e)
            message.channel.send(errorEmbed(e))
        }
    }
}