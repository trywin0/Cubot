const Discord = require("discord.js");
const fetch = require("node-fetch")
const { functions } = require("../../functions");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "movie",
    description: "Get a word that sounds similar to the word provided",
    usage: "soundslike ´word´",
    accessibleto: 3,
    run: async(client, message, args) => {
        const msg = await message.channel.send("<:717436253762486302:730023157741650010> Fetching word...")
        try {
            if (!args[0]) return argsEmbed(this.usage)
            let response = await fetch(`https://api.datamuse.com/words?sl=${args.join(" ")}`).then(res => res.json())
            if (!response[1]) return msg.edit("\u200b", redEmbed(`I couldn't find any words rhyming with ${args.join("")}`))
            msg.edit("\u200b", greenEmbed(`Here's a word rhyming with ${args.join(" ")}: ${response[1].word}`))
        } catch (e) {
            msg.edit("\u200b", redEmbed(`I couldn't find any words rhyming with ${args.join("")}`))
            console.log(e);
        }
    }
}