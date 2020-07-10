const Discord = require("discord.js");
const { functions } = require("../../functions");
const { ar } = require("@vitalets/google-translate-api/languages");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "image",
    description: "Get a image based on your message",
    usage: "image `what to search for`",
    aliases: ["img"],
    accessibleto: 3,
    run: async(client, message, args) => {
        try {
            if (!message.channel.nsfw) return message.channel.send(redEmbed("This command can only be used in nsfw channels for safety reasons"))
            if (!args) return message.channel.send(argsEmbed("image `what to search for`"))
            const { image_search } = require("duckduckgo-images-api")
            const msg = await message.channel.send("<:717436253762486302:730023157741650010> Fetching images...")
            image_search({
                query: args.join(" "),
                moderate: true,
                iterations: 1,
                retries: 1
            }).then(m => {
                let image = m[Math.floor(Math.random() * m.length)]
                if (!image || !image.thumbnail) return msg.edit("\u200b", { embed: redEmbed("I couldnt find any images with that search term") })
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${args.join(" ")} image`)
                    .setImage(image.thumbnail)
                    .setColor("A2AAFF");
                msg.edit("\u200b", { embed: embed })
            })
        } catch (e) {
            console.log(e);
            message.channel.send(errorEmbed(e))
        }
    }
}