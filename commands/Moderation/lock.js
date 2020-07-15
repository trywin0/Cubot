const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const prefix = require("../../models/prefix")

module.exports = {
    name: "lock",
    accessibleto: 1,
    run: (client, message, args) => {
        message.channel.lock = () => {
            return new Promise((resolve, reject) => {
                message.channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: false }, "Locked channel").then(() => {
                    resolve(true)
                }).catch(e => {
                    console.log(e)
                    reject(e)
                })
            })
        }
        try {
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(permEmbed("MANAGE_CHANNELS"))
            message.channel.lock().then(() => {
                message.channel.send(greenEmbed("Successfully locked channel."))
            })
        } catch (e) {
            console.log(e)
            message.channel.send(errorEmbed(e))
        }
    }
}