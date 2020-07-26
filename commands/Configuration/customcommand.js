const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const customcommands = require("../../models/customcommand")
module.exports = {
    name: "customcommand",
    accessibleto: 1,
    description: `Create a custom command using JavaScript, The code has to be a expression. The following variables are predefined: author: {
        id: author id,
        tag: author tag,
        name: author username,
        discriminator: author discriminator
    }, 
    mentioned: same as author except it is nullable,
    message: the message content`,
    run: (client, message, args) => {
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
                        .setDescription(res.map(cmd => `**[${i++}]** \`${cmd.trigger}\``))
                        .setColor("A2AAFF")
                    message.channel.send(embed)
                })
                break;
            case "create":
                let trigger = message.content.split('"')[1].split('"')[0]
                let code = args.slice(1).join(" ").replace(`"${trigger}"`, "")
                let mentioned = message.mentions.users.first()
                let context = {
                    author: {
                        id: message.author.id,
                        tag: message.author.tag,
                        name: message.author.username,
                        discriminator: message.author.discriminator
                    },
                    mentioned: {
                        id: mentioned ? mentioned.id : null,
                        tag: mentioned ? mentioned.tag : null,
                        name: mentioned ? mentioned.name.username : null,
                        discriminator: mentioned ? mentioned.discriminator : null
                    },
                    message: message.content
                }
                const safeEval = require("safe-eval")
                try {
                    console.log(safeEval(code, context))
                } catch (e) {
                    return message.channel.send(redEmbed("The provided code gave a error: \n" + e))
                } finally {
                    const evaled = safeEval(code, context)
                    message.channel.send(evaled).catch(console.log)
                    customcommands.create({ sid: message.guild.id, trigger: trigger, code: code }).then(console.log).catch(console.log)
                    message.channel.send(greenEmbed(`Successfully created new custom command`))
                }

                break;
            case "delete":
                customcommands.findOneAndRemove({ sid: message.guild.id, trigger: args.slice(1).join(" ") }, (err, res) => {
                    if (!res) return message.channel.send(redEmbed("I couldn't find any custom commands with that trigger"))
                    message.channel.send(greenEmbed(`Successfully deleted the custom command \`${args.slice(1).join(" ")}\``))
                })
                break;
        }

    }
}