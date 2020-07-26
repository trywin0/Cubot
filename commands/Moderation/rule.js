const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed, perm } = functions
const rules = require("../../models/rules")
module.exports = {
    name: "rule",
    accessibleto: 1,
    run: (client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permEmbed("ADMINISTRATOR"))
            console.log("rules ran")
            let genRule = (index, rule) => {
                let ruleEmbed = new Discord.MessageEmbed().setTitle(`Rule #${index}`).setColor("GREEN").setDescription(rule);
                if (index == 1) ruleEmbed.setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
                return ruleEmbed
            }
            rules.findOne({ sid: message.guild.id }, async(err, res) => {
                if (err) return console.log(err);
                if (!res) res = await rules.create({ sid: message.guild.id })
                console.log(res)
                let ruleChannel = message.guild.channels.cache.get(res.channel)
                let index = res.rules.indexOf(args.slice(1).join(" ")) + 1

                switch (args[0]) {
                    case "channel":
                        if (!message.guild.channels.cache.get(args[1]) && !message.mentions.channels.first()) return message.channel.send(redEmbed("There's no channels in this guild with that id / name"))
                        res.channel = (message.guild.channels.cache.get(args[1]) || message.mentions.channels.first()).id;
                        res.save()
                        message.channel.send(greenEmbed("Changed rules channel. Make sure to delete rules messages in old channel if needed"))
                        break;
                    case "add":
                        if (!args[1]) return;
                        res.rules.push(args.slice(1).join(" "))
                        res.save()
                        index = res.rules.indexOf(args.slice(1).join(" ")) + 1
                        message.channel.send(greenEmbed(`Added a new rule with the index of ${index}`))

                        if (!ruleChannel) return;
                        ruleChannel.send(genRule(index, args.slice(1).join(" ")))
                        break;
                    case "remove":
                        if (!args[1]) return;
                        if (!res.rules[parseInt(args[1]) - 1]) return message.channel.send(redEmbed(`There is no rule with the index ${parseInt(args[1]) - 1}`))
                        res.rules.splice(parseInt(args[1]) - 1, 1)
                        res.save()
                        ruleChannel.messages.fetch().then(msgs => {
                            msgs.forEach(msg => {
                                if (msg.embeds[0] && (/Rule #[0-9]+/.test(msg.embeds[0].title))) {
                                    msg.delete()
                                }
                            })
                            res.rules.forEach((rule, i) => {
                                ruleChannel.send(genRule(i + 1, rule))
                            })
                        })
                        if (!ruleChannel) return;
                        message.channel.send(greenEmbed(`Removed rule ${args[1]}`))
                        break;
                }


            })
        } catch (e) {
            console.log(e)
            message.channel.send(errorEmbed(e))
        }
    }
}