const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
module.exports = {
    name: "eval",
    description: "Evaluate code!",
    usage: "eval `Code to evaluate`",
    accessibleto: 0,
    run: async(client, message, args) => {
        try {
            const code = args.join(" ")
            const { inspect } = require("util")
            const config = require("../../config.json");
            if (message.author.id !== config.ownerid) return message.channel.send(permEmbed("BOT_OWNER"))
            let evaled;
            try {
                evaled = await eval(args.join(" "));
                const codeEmbed = new Discord.MessageEmbed()
                    .setColor("#A2AAFF")
                    .setTitle("Eval")
                    .addField("<:717436254001823784:730021597859020870> Input ", `\`\`\`${code}\`\`\``)
                    .addField("<:717436253842440192:730022265810583583> Output", `\`\`\`${inspect(evaled)}\`\`\``);
                message.channel.send(codeEmbed)
                console.log(inspect(evaled));
            } catch (error) {
                console.error(error);
                const codeEmbed = new Discord.MessageEmbed()
                    .setColor("#A2AAFF")
                    .setTitle("Eval")
                    .addField("<:717436254001823784:730021597859020870> Input ", `\`\`\`${code}\`\`\``)
                    .addField("<:697509954575269968:730022033777492038> Output (**error**)", `\`\`\`${error}\`\`\``);
                message.channel.send(codeEmbed)
            }
        } catch (e) {
            console.log(e);
            message.channel.send(errorEmbed(e))
        }
    }
}