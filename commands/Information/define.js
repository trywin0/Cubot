const Discord = require("discord.js");
const Color = require("color")
const moment = require("moment")
const { functions } = require("../../functions");
const { ar, co } = require("@vitalets/google-translate-api/languages");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "roleinfo",
    description: "Get the definition of a word or a synonym",
    usage: "define ´word´",
    aliases: ["whatis"],
    accessibleto: 3,
    run: async(client, message, args) => {
        try {
            var defineJson = require('define-it').json;

            defineJson(args.join(" "), function(err, res) {
                if (err) console.error(err);
                if (res) console.log(res);
            });

            if (`${args.join(" ")} is a \n`) return message.channel.send(redEmbed("I could not find that word in our database"))
            const roleEmbed = new Discord.MessageEmbed()
                .setColor("A2AAFF")
                .setDescription(
                    `**<:717437070821425273:730021865741090816> \`${args.join(" ")}\` definition**
                • Definition(s): \`${getDefinition(args.join(" "))}\`
                `)
            message.channel.send(roleEmbed)
        } catch (e) {
            console.log(e);
            message.channel.send(errorEmbed(e))
        }
    }
}