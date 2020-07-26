const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "ping",
    run: (client, message, args) => {
        message.channel.send(greenEmbed(`Pong! My ping is ${client.ws.ping}ms`))
    }
}