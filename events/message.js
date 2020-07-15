const Discord = require("discord.js")
const { functions } = require("../functions");
const emojiRegex = require('emoji-regex');
const eRegex = emojiRegex();
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const automod = require("../models/automod");
const prefixE = require("../models/prefix");
const profanity = require("bad-words")
const regex = /(([A-Za-z]{3,9}):\/\/)?([-;:&=\+\$,\w]+@{1})?(([-A-Za-z0-9]+\.)+[A-Za-z]{2,3})(:\d+)?((\/[-\+~%\/\.\w]+)?\/?([&?][-\+=&;%@\.\w]+)?(#[\w]+)?)?/
const cooldowns = new Map()
const spam = new Map()
const customcommands = require("../models/customcommand")
exports.run = async(client, message) => {
    if (message.channel.type == "dm") return;

    function resetCommand(command) {
        let category = client.commands.get(command).category
        if (!client.commands.get(command)) return;
        delete require.cache[require.resolve(`../commands/${client.commands.get(command).category}/${command}.js`)]
        client.commands.delete(command)
        const pull = require(`../commands/${category}/${command}.js`)
        pull.category = category
        client.commands.set(command, pull)
    }
    if (message.author.bot) return;
    customcommands.findOne({ sid: message.guild.id, trigger: message.content }, (err, res) => {
        if (err) console.log(err)
        if (res) {
            message.channel.send(res.response)
        }
    })
    let getPrefix = () => {
        return new Promise((resolve, reject) => {


            prefixE.findOne({ sid: message.guild.id }, (err, res) => {
                if (err) console.log(err) && reject(err)
                if (!res) resolve("/")
                if (res) resolve(res.prefix)
            })
        })
    }
    let prefix = await getPrefix()
    automod.findOne({ sid: message.guild.id }, (err, res) => {
        if (err) return console.log(err)
        if (!res) return;
        if (res.enables.includes(1)) {
            let filter = new profanity()
            if (filter.isProfane(message.content)) {
                message.delete()
                return message.channel.send(redEmbed("You are not allowed to swear in this guild!")).then(m => m.delete({ timeout: 5000 }))
            }

        }
        if (res.enables.includes(2)) {
            if (regex.test(message.content)) {
                message.delete()
                return message.channel.send(redEmbed("You are not allowed to send links in this guild!")).then(m => m.delete({ timeout: 5000 }))
            }
        }
        if (res.enables.includes(3)) {
            if (((message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi) ? message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi).length : 0) + (message.content.match(eRegex) ? message.content.match(eRegex).length : 0)) > 6) {
                message.delete()
                return message.channel.send(redEmbed("You are not allowed to send that many emojis in this guild!")).then(m => m.delete({ timeout: 5000 }))
            }

        }
        if (res.enables.includes(4)) {
            if (message.mentions.users.size > 4) {
                message.delete()
                return message.channel.send(redEmbed("You are not allowed to mass mention in this guild!")).then(m => m.delete({ timeout: 30000 }))
            }

        }
        if (res.enables.includes(5)) {
            if (!spam.has(message.author.id)) {
                spam.set(message.author.id, true)
                const collector = message.channel.createMessageCollector(m => m.author.id == message.author.id, { max: 4, time: 3000 })
                collector.on("end", async collected => {
                    if (collected.size > 3) {
                        message.channel.send(message.author.toString(), redEmbed("Stop spamming!")).then(m => m.delete({ timeout: 10000 }))
                        let messages = await message.channel.messages.fetch({ limit: 100 })
                        let i = 0;
                        messages = messages.filter(m => {
                            i++;
                            return i < collected.size && m.author.id == message.author.id
                        });
                        message.channel.bulkDelete(messages)
                    }
                    spam.delete(message.author.id)
                })
            }
        }
    })
    if (message.content.startsWith(prefix)) {
        let cooldownUser = (id, time, cmd) => {
            if (cooldowns.has(cmd)) {
                cooldowns.get(cmd).set(id, time)
            } else {
                cooldowns.set(cmd, new Map().set(id, time))
            }
            setTimeout(() => {
                cooldowns.get(cmd).delete(id)
            }, cooldowns.get(cmd).get(id) * 1000);
        }
        let messageArray = message.content.split(" "),
            cmd = messageArray[0].split(prefix)[1].toLowerCase(),
            args = messageArray.slice(1);
        let aliascmd = client.commands.find(c => c.aliases && c.aliases.includes(cmd))
        if (aliascmd) {
            const command = require(`../commands/${aliascmd.category}/${aliascmd.name}.js`)
            const cooldown = aliascmd.cooldown ? aliascmd.cooldown : 5
            if (cooldowns.has(aliascmd.name) && cooldowns.get(aliascmd.name).has(message.author.id)) return message.channel.send(redEmbed("This command is on a cooldown. Please wait and try again later"))
            cooldownUser(message.author.id, cooldown, aliascmd.name)
            resetCommand(aliascmd.name)
            command.run(client, message, args)
        } else if (client.commands.has(cmd)) {
            let commandfile = client.commands.get(cmd);
            const cooldown = commandfile.cooldown ? commandfile.cooldown : 5
            if (cooldowns.has(cmd) && cooldowns.get(cmd).has(message.author.id)) return message.channel.send(redEmbed("This command is on a cooldown. Please wait and try again later"))
            cooldownUser(message.author.id, cooldown, cmd)
            resetCommand(cmd)
            commandfile.run(client, message, args)
        }
    }

}