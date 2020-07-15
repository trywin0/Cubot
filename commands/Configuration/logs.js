const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const logs = require("../../models/logs");
const { rawListeners } = require("../../models/logs");
module.exports = {
    name: "logs",
    accessibleto: 1,
    run: (client, message, args) => {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permEmbed("ADMINISTRATOR"))
            logs.findOne({ sid: message.guild.id }, async(err, res) => {
                if (!res) {
                    res = await logs.create({ sid: message.guild.id })
                }
                let available = (num = Number) => {
                    if (!res) return `<:717436254077321266:730022259653083186>`
                    let numbers = ["all", "delete", "edit", "joinleave", "mod", "role", "nickname", "channel"]
                    return res[numbers[num]] && client.channels.cache.has(res[numbers[num]]) ? `<:717436253871669328:730021595044904982> ${client.channels.cache.get(res[numbers[num]])}` : `<:717436254077321266:730022259653083186>`
                }
                const embed = new Discord.MessageEmbed()
                    .setDescription(`**<:717436253376872500:730022249821765633> Logs**
                
                **[1]** Message deletions : ${available(1)}
                **[2]** Message edits : ${available(2)}
                **[3]** Member joins / leaves : ${available(3)}
                **[4]** Moderator actions : ${available(4)}
                **[5]** Role updates : ${available(5)}
                **[6]** Nickname changes : ${available(6)}
                **[7]** Channel updates : ${available(7)}`)
                    .setColor("A2AAFF")
                    .setFooter("Type numbers from 0-7 and mention a channel to set logs, 0 = all choices\n Example: 147 #log-channel\nType 'cancel' to cancel")
                message.channel.send(embed)
                let collector = message.channel.createMessageCollector(msg => msg.author.id == message.author.id && ((!isNaN(msg.content.split(" ")[0]) && msg.mentions.channels.first()) || msg.content == "cancel"), { max: 1, time: 10000 })
                collector.on("collect", msg => {
                    if (msg.content == "cancel") return message.channel.send(greenEmbed("Cancelled selection"))
                    let channel = msg.mentions.channels.first().id
                    let numbers = msg.content.split(" ")[0].split("").map(n => parseInt(n))
                    numbers.forEach(number => {
                        let choices = ["all", "delete", "edit", "joinleave", "mod", "role", "nickname", "channel"]
                        res[choices[number]] = channel
                    })
                    res.save()
                })
            })
        } catch (e) {
            console.log(e)
            message.channel.send(errorEmbed(e))
        }
    }
}