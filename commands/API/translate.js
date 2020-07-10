const Discord = require("discord.js");
const translate = require('google-translate-open-api')
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "translate",
    description: "Translate some text!",
    usage: "translate `language code` `text to translate`",
    accessibleto: 3,
    run: async(client, message, args) => {
        let error = false
        const msg = await message.channel.send("<:717436253762486302:730023157741650010> Translating...")
        try {
            const translate = require('@vitalets/google-translate-api');
            if (!args[1]) return argsEmbed("translate `language code` `text to translate`")
            let translation = await translate(args.slice(1).join(" "), { to: args[0] }).catch(e => {
                console.log(e);
                error = true
                return msg.edit("\u200b", { embed: redEmbed("Unsupported language.") })
            })
            const translateEmbed = new Discord.MessageEmbed()
                .setColor("A2AAFF")
                .addField("<:717436253888577606:730021861282545665> Input", `\`\`\`${args.slice(1).join(" ")}\`\`\``)
                .addField("<:717436253313695816:730022243249160264> Output", `\`\`\`${translation.text}\`\`\``);
            if (!error) msg.edit("\u200b", { embed: translateEmbed })
        } catch (e) {
            console.log(e);
            error = true
            return msg.edit("\u200b", { embed: redEmbed("Unsupported language.") })
        }
    }
}