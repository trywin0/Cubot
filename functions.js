const Discord = require("discord.js")
module.exports.functions = {
    permEmbed: (permission) => {
        if (!permission) throw new TypeError("you need to specify what permission the user is missing")
        let permEmbed = new Discord.MessageEmbed()
            .setTitle("Insufficient permissions!")
            .setDescription(`<:697509954575269968:730022033777492038> You are lacking the permission \`${permission.toUpperCase()}\` required to perform this command`)
            .setColor("RED")
        return permEmbed
    },
    greenEmbed: (title) => {
        let greenEmbed = new Discord.MessageEmbed()
            .setTitle(`<:697510021386338314:730021856626737173> ${title}`)
            .setColor("GREEN")
        return greenEmbed
    },
    redEmbed: (title) => {
        let redEmbed = new Discord.MessageEmbed()
            .setTitle(`<:697509954575269968:730022033777492038> ${title}`)
            .setColor("RED")
        return redEmbed
    },
    argsEmbed: (usage) => {
        let redEmbed = new Discord.MessageEmbed()
            .setTitle(`Invalid arguments!`)
            .setDescription(`<:697509954575269968:730022033777492038> Wrong usage of command.\n✅ Correct usage: ${usage}`)
            .setColor("RED")
        return redEmbed
    },
    errorEmbed: (error) => {
        let redEmbed = new Discord.MessageEmbed()
            .setTitle(`A error occured!`)
            .setDescription(`<:697509954575269968:730022033777492038> ERROR <:697509954575269968:730022033777492038>\n\`\`\`diff\n-${error.message.replace("\n", "\n -")}\`\`\``)
            .setColor("RED")
        return redEmbed
    },
    logEmbed: (title, action, user, author, reason) => {
        let logEmbed = new Discord.MessageEmbed()
            .setTitle(title)
            .addField("Action", action, true)
            .addField("Moderator", author, true)
            .addField("User", user, true)
            .addField("Reason", reason ? reason : "No reason specified")
            .setColor("BLUE")
        return logEmbed
    }
}