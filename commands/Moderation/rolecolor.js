const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const prefix = require("../../models/prefix")

module.exports = {
    name: "rolecolor",
    accessibleto: 1,
    run: async(client, message, args) => {
        try {
            if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(permEmbed("MANAGE_ROLES"))
            if (!args[1]) return message.channel.send(argsEmbed("rolecolor `color` `role`"))
            const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() == args.slice(1).join(" ").toLowerCase()) || message.guild.roles.cache.get(args.slice(1).join(" ")) || await client.roles.fetch(args.slice(1).join(" ")).catch(e => console.log(e))
            if (!role) return message.channel.send(redEmbed("There is no role that has that name or id in this server"))
            role.setColor(args[0]).then(() => {
                message.channel.send(greenEmbed(`Successfully set ${role.name}'s color to ${args[0]}`))
            }).catch(e => {
                console.log(e);
                message.channel.send(redEmbed("I couldn't do that, make sure the color you provided is correct or that the bot has permission to change that role's color"))
            })
        } catch (e) {
            console.log(e)
            message.channel.send(errorEmbed(e))
        }
    }
}