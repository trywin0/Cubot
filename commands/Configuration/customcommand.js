const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const customcommands = require("../../models/customcommand")
module.exports = {
    name: "customcommand",
    accessibleto: 1,
    run: (client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permEmbed("ADMINISTRATOR"))
            if (!["all", "create", "delete"].includes(args[0])) return message.channel.send(argsEmbed("customcommand `all | create | delete`"))
            switch (args[0]) {
                case "all":
                    customcommands.find({ sid: message.guild.id }, (err, res) => {
                        if (err) return console.log(err)
                        if (!res) return message.channel.send(redEmbed("This guild doesnt have any custom commands"))
                        let i = 1;
                        const truncate = (input) => input.length > 5 ? `${input.substring(0, 5)}...` : input;
                        const embed = new Discord.MessageEmbed()
                            .setTimestamp()
                            .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
                            .setTitle("Custom commands")
                            .setDescription(res.map(cmd => `**[${i++}]** \`${cmd.trigger}\` - \`${truncate(cmd.response)}\``))
                            .setColor("A2AAFF")
                        message.channel.send(embed)
                    })
                    break;
                case "create":
                    let regex = /"(.+)" ?(.+)/s
                    let execed = Object.values(regex.exec(args.join(" ")))
                    if (!execed) return message.channel.send
                    let trigger = execed[1]
                    let response = execed[2]
                    customcommands.create({ sid: message.guild.id, trigger: trigger, response: response }).then(console.log)
                    message.channel.send(greenEmbed(`Successfully created new custom command`))
                    break;
                case "delete":
                    customcommands.findOneAndRemove({ sid: message.guild.id, trigger: args.slice(1).join(" ") }, (err, res) => {
                        if (!res) return message.channel.send(redEmbed("I couldn't find any custom commands with that trigger"))
                        message.channel.send(greenEmbed(`Successfully deleted the custom command \`${args.slice(1).join(" ")}\``))
                    })
                    break;
            }
        } catch (e) {
            console.log(e)
            message.channel.send(errorEmbed(e))
        }
    }
}