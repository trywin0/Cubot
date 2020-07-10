const Discord = require("discord.js");
const { functions } = require("../../functions");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed } = functions
const bruh = require("fakeinfo")
module.exports = {
        name: "fakeinfo",
        description: "Get fake personal info",
        usage: "fakeinfo",
        aliases: ["fakeid", "generateid"],
        accessibleto: 3,
        run: async(client, message, args) => {
                try {
                    const msg = await message.channel.send("<:717436253762486302:730023157741650010>  Generating fake information...")
                    let fakeinfo = await bruh()
                    console.log(fakeinfo)
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(fakeinfo.name, fakeinfo.image, `https://www.babysfirstdomain.com/meaning/${fakeinfo.gender == "male"? "boy":"girl"}/${fakeinfo.name.split(" ")[0].toLowerCase()}`)
                        .setThumbnail(fakeinfo.image)
                        .setColor(fakeinfo.favoritecolor.toUpperCase())
                        .setDescription(`
                ❯ Birthday: ${fakeinfo.birthday}
                ❯ Age: ${fakeinfo.age}
                ❯ Gender: ${fakeinfo.gender.charAt(0).toUpperCase() + fakeinfo.gender.slice(1)}
                ❯ Favorite color: ${fakeinfo.favoritecolor}
                ❯ Height: ${fakeinfo.height}
                ❯ Weight: ${fakeinfo.weight}
                ❯ Blood type: ${fakeinfo.bloodtype}

                ❯ Phone number: ${fakeinfo.phone}
                ❯ Email address: ${fakeinfo.emailaddress}
                ❯ Username: ${fakeinfo.username}
                ❯ Password: ${fakeinfo.password}
                
                ❯ ${fakeinfo.mastercard? `MasterCard: ${fakeinfo.mastercard}`:  `Visa: ${fakeinfo.visa}`}
                ❯ Expires: ${fakeinfo.expires}
                ❯ ${fakeinfo.cvc2 ? `CVC2: ${fakeinfo.cvc2}`:  `CVV2: ${fakeinfo.cvv2}`}`)
                
            msg.edit("\u200b", { embed: embed })
        } catch (e) {
            console.log(e);
            message.channel.send(errorEmbed(e))
        }
    }
}