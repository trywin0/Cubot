const Discord = require("discord.js");
const Color = require("color")
const moment = require("moment")
const { functions } = require("../../functions");
const { ar } = require("@vitalets/google-translate-api/languages");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "roleinfo",
    description: "Get information on a role",
    usage: "roleinfo `role name or id`",
    aliases: ["role"],
    accessibleto: 3,
    run: async(client, message, args) => {
        try {
            const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() == args.join(" ").toLowerCase()) || message.guild.roles.cache.get(args.join(" "))
            if (!role) return message.channel.send(redEmbed("There is no role that has that name or id in this server"))
            const createdTime = moment(role.createdTimestamp).format('MMMM Do YYYY, h:mm:ss a')
            const color = Color(role.hexColor).rgb(role.hexColor).color
            console.log(role)
            const roleEmbed = new Discord.MessageEmbed()
                .setColor("A2AAFF")
                .setDescription(
                    `<:717437070821425273:730021865741090816> Information about ${role}
                • Name: \`${role.name}\`
                • ID: \`${role.id}\`
                • Hex color: \`${role.hexColor}\`
                • RGB color: \`${color.join(", ")}\`
                • Members: \`${role.members.size}\`
                • Created on: \`${createdTime}\`
                `)
            message.channel.send(roleEmbed)
        } catch (e) {
            console.log(e);
            message.channel.send(errorEmbed(e))
        }
    }
}