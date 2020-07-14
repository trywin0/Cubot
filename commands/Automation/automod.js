const Discord = require("discord.js");
const { functions } = require("../../functions");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const automod = require("../../models/automod");
const { auto } = require("@vitalets/google-translate-api/languages");
module.exports = {
    name: "automod",
    description: "Configurate the server's auto-moderation settings",
    usage: "automod",
    aliases: ["automoderation"],
    accessibleto: 3,
    run: async(client, message, args) => {
        try {
            automod.findOne({ sid: message.guild.id }, async(err, res) => {
                console.log(res)
                if (err) console.log(err)
                let enables;
                if (!res) {
                    automod.create({ sid: message.guild.id, enables: [] })
                    enables = []
                } else {
                    enables = res.enables
                }

                const emojis = {
                    enabled: "<:717436253871669328:730021595044904982>",
                    disabled: "<:717436254077321266:730022259653083186>"
                }
                let isenabled = (numb) => {
                    if (enables.includes(numb)) {
                        return true
                    } else {
                        return false
                    }
                }
                const embed = new Discord.MessageEmbed()
                    .setColor("A2AAFF")
                    .setDescription(
                        `**<:717436253376872500:730022249821765633> Auto Moderation**

                  **1.** Swearing : ${isenabled(1)?emojis.enabled:emojis.disabled}
                  **2.** Link/URL : ${isenabled(2)?emojis.enabled:emojis.disabled}
                  **3.** Emoji Spam: ${isenabled(3)?emojis.enabled:emojis.disabled}
                  **4.** Mass mention: ${isenabled(4)?emojis.enabled:emojis.disabled}
                `)
                    .setTimestamp()
                let msg = await message.channel.send(embed)
                "1️⃣ 2️⃣ 3️⃣ 4️⃣ 730021591454580766".split(" ").forEach(async e => await msg.react(e))
                let collector = msg.createReactionCollector((r, u) => u.id == message.author.id && "1️⃣ 2️⃣ 3️⃣ 4️⃣ 697510021386338314".split(" ").includes(r.emoji.name), {});
                collector.on("collect", (reaction, user) => {
                    Array.prototype.remove = function(item) {
                        const oldLength = this.length
                        let newLength = 0

                        for (let i = 0; i < oldLength; i++) {
                            const entry = this[i]
                            if (entry === item) {
                                let newLength = i++

                                    while (i !== list.length) {
                                        const entry = this[i]
                                        if (entry !== item) this[newLength++] = entry
                                        i++
                                    }

                                this.length = newLength
                                for (let i = newLength; i < oldLength; i++) delete this[i]
                                return true
                            }
                        }

                        return false
                    }
                    let choice = "1️⃣ 2️⃣ 3️⃣ 4️⃣".split(" ").indexOf(reaction.emoji.name) + 1
                    if (!enables.includes(choice) && choice != 0) { enables.push(choice) } else { enables.remove(choice) }
                    const newembed = new Discord.MessageEmbed()
                        .setColor("A2AAFF")
                        .setDescription(
                            `**<:717436253376872500:730022249821765633> Auto Moderation**

              **1.** Swearing : ${isenabled(1)?emojis.enabled:emojis.disabled}
              **2.** Link/URL : ${isenabled(2)?emojis.enabled:emojis.disabled}
              **3.** Emoji Spam: ${isenabled(3)?emojis.enabled:emojis.disabled}
              **4.** Mass mention: ${isenabled(4)?emojis.enabled:emojis.disabled}
            `)
                        .setTimestamp()
                    msg.edit(newembed)
                    if (reaction.emoji.name == "697510021386338314") {
                        res.enables = enables
                        collector.emit("end", {})
                        msg.reactions.removeAll()
                        res.save().catch(e => {
                            setTimeout(() => {
                                res.save()
                            }, 400);
                        })
                    }
                })
            })
        } catch (e) {
            console.log(e);
            message.channel.send(errorEmbed(e))
        }
    }
}