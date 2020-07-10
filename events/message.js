const Discord = require("discord.js")
const { prefix } = require("../config.json")
const { title } = require("process")
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
        let messageArray = message.content.split(" "),
            cmd = messageArray[0].split(prefix)[1].toLowerCase(),
            args = messageArray.slice(1);
        let aliascmd = client.commands.find(c => c.aliases && c.aliases.includes(cmd))
        if (aliascmd) {
            const command = require(`../commands/${aliascmd.category}/${aliascmd.name}.js`)
            resetCommand(aliascmd.name)
            command.run(client, message, args)
        } else if (client.commands.has(cmd)) {
            let commandfile = client.commands.get(cmd);
            resetCommand(cmd)
            commandfile.run(client, message, args)
        }
    }

}