const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const welcome = require("../../models/welcome");
const findOne = (obj) => {
    return new Promise((res, rej) => {
        welcome.findOne(obj, (e, r) => {
            if (e) return rej(e)
            res(r)
        })
    })
}
module.exports = {
    name: "welcome",
    accessibleto: 1,
    description: "Set guild's welcome message and channel, replace the member with {member}",
    usage: "welcome <#channel> <\"Welcome to the server, {member}!\">",
    run: async(client, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permEmbed("ADMINISTRATOR"));
        if (!message.mentions.channels.first() || !args[1]) return message.channel.send(argsEmbed("welcome <#channel> <\"Welcome to the server, {member}!\">"))
        let databaseGuild = await findOne({ sid: message.guild.id });
        if (databaseGuild) {
            databaseGuild.message = args.slice(1).join(" ")
            databaseGuild.channel = message.mentions.channels.first().id
            databaseGuild.save()
        }
        if (!databaseGuild) databaseGuild = await welcome.create({ sid: message.guild.id, channel: message.mentions.channels.first().id, message: args.slice(1).join(" ") })
        message.channel.send(greenEmbed("Successfully set the welcome channel & message"))
    }
}