const Discord = require("discord.js")
const { prefix } = require("../config.json")
const { functions } = require("../functions");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const { title } = require("process")
const cooldowns = new Map()
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
    if (message.content == "<@694888432031367259> help" || message.content == "<@!694888432031367259> help") {

    }
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