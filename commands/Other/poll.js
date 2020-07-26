const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "poll",
    aliases: ["vote"],
    description: "Start a poll!",
    usage: "poll {title} [option] [option]*",
    accessibleto: 3,
    run: async(client, message, args) => {
        try {
            const Discord = require("discord.js");
            const emojis = "🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿".split(" ")
            let options = args.join(" ").match(/\[([^\]^\[]+)\]/gm)
            if (!options) return message.channel.send(argsEmbed("poll {title} [option] [option]*"))
            options = options.map(m => m.replace("[", "").replace("]", "")).map(o => `${emojis[ args.join(" ").match(/\[([^\]^\[]+)\]/gm).map(m => m.replace("[", "").replace("]", "")).indexOf(o)]} ${o}`).join("\n")
            let title = /{([^}^{]+)}/.exec(args.join(" "))[1]
            if (!title) return message.channel.send(argsEmbed("poll {title} [option] [option]*"))
            const embed = new Discord.MessageEmbed()
                .setThumbnail(client.user.displayAvatarURL())
                .setTitle(title)
                .setDescription(options)
                .setColor("BLUE")
                .setFooter(message.author.tag, client.user.displayAvatarURL())
                .setTimestamp();
            message.channel.send(embed).then(async m => {
                for (var i = 0; i < args.join(" ").match(/\[([^\]^\[]+)\]/gm).length; i++) {
                    await m.react(emojis[i])
                }
            })
        } catch (e) {
            console.error(e)
            message.channel.send(errorEmbed(e))
        }
    }

}