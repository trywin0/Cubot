const Discord = require("discord.js");
const { functions } = require("../../functions")
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const accessible = {
    0: "Bot creator",
    1: "Administrators",
    2: "Moderators",
    3: "Everyone"
}
module.exports = {
        name: "help",
        aliases: ["commands"],
        description: "Show all commands!",
        usage: "help `Command name (optional)`",
        accessibleto: 3,
        run: async(client, message, args) => {
                try {
                    if (!args[0]) {
                        let Categories = []
                        client.commands.forEach(command => {
                            if (!Categories.includes(command.category)) Categories.push(command.category)
                        })
                        const helpEmbed = new Discord.MessageEmbed()
                            .setColor("A2AAFF")
                            .setTitle("Help")
                            .setDescription(`[Invite me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot "Invite me to your server")\n[Github repository](https://github.com/trywin0/Cubot "Bot source code")`)

                        Categories.forEach(category => {
                                    let amount = client.commands.filter(c => c.category == category).map(m => m.name).length
                                    helpEmbed.addField(`**❯ ${category}**  [${amount}]`, `\`${client.commands.filter(c=>c.category == category).map(m=>m.name).join("`, `")}\``)
            })
            message.channel.send(helpEmbed)
        }else if(client.commands.has(args[0]) || client.commands.find(e=>e.aliases && e.aliases.includes(args[0]))){
         let command = client.commands.get(args[0]) || client.commands.find(e=>e.aliases && e.aliases.includes(args[0]));
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Help")
        .setColor("A2AAFF")
        .setDescription(`[Invite me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot "Invite me to your server")\n[Github repository](https://github.com/trywin0/Cubot "Bot source code")`)
        .addField("**❯ Name**", `\`${command.name}\``)
        .addField("**❯ Aliases**", command.aliases?`\`${command.aliases.join("`, `")}\``:"`None`")
        .addField("**❯ Description**", command.description?`\`${command.description}\``:"`None`")
        .addField("**❯ Accessible to**", command.accessibleto?`\`${accessible[command.accessibleto]}\``:"`Unknown`")
        .addField("**❯ Usage**", command.usage?command.usage:"`Unknown`");
        message.channel.send(helpEmbed)
       
        }

        } catch (e) {
            console.error(e)
            message.channel.send(errorEmbed(e))
        }
    }

}