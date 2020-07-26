const Discord = require("discord.js");
const fetch = require("node-fetch")
const { functions } = require("../../functions");
const { ar } = require("@vitalets/google-translate-api/languages");
const { redEmbed, greenEmbed, permEmbed, argsEmbed, errorEmbed, perm } = functions
module.exports = {
    name: "movie",
    description: "Get some information on a movie!",
    usage: "movie `Movie title`",
    accessibleto: 3,
    run: async(client, message, args) => {
        const msg = await message.channel.send("<:717436253762486302:730023157741650010> Finding movie...")
        try {
            let object;
            if (!args[0]) return msg.edit(msg.edit("\u200b", { embed: argsEmbed("movie `Movie title`") }))
            if (/\(([0-9]{4})\)/.test(args.join(" "))) {
                let { Title, Rated, Released, Runtime, Genre, Director, Plot, Language, Poster } = await fetch(`https://www.omdbapi.com/?apikey=44722b12&t=${args.join(" ").replace(/\([0-9]{4}\)/, "")}&type=movie&y=${args.join(" ").match(/\(([0-9]{4})\)/)[1]}`).then(res => res.json()) //args.join(" ").match(/\(([0-9]{4})\)/)[1]}
                object = { Title, Rated, Released, Runtime, Genre, Director, Plot, Language, Poster }
            } else {
                let { Title, Rated, Released, Runtime, Genre, Director, Plot, Language, Poster } = await fetch(`https://www.omdbapi.com/?apikey=44722b12&t=${args.join(" ")}&type=movie`).then(res => res.json()) //args.join(" ").match(/\(([0-9]{4})\)/)[1]}
                object = { Title, Rated, Released, Runtime, Genre, Director, Plot, Language, Poster }
            }
            let { Title, Rated, Released, Runtime, Genre, Director, Plot, Language, Poster } = object
            if (!Title) return msg.edit("\u200b", { embed: redEmbed("I could not find that movie") })
            const movieEmbed = new Discord.MessageEmbed()
                .setColor("A2AAFF")
                .setTitle(Title)
                .setDescription(`
                ❯ Title: ${Title}
                ❯ Release date: ${Released}
                ❯ Runtime: ${Runtime}
                ❯ Genre: ${Genre}
                ❯ IMDB Rating: ${Rated}
                ❯ Director: ${Director}
                ❯ Language: ${Language}`)
                .addField("Plot", `\`\`\`${Plot}\`\`\``)
            if (Poster != "N/A" && Poster != undefined) movieEmbed.setThumbnail(Poster)
            msg.edit("\u200b", { embed: movieEmbed })
        } catch (e) {
            msg.edit("\u200b", { embed: redEmbed("I could not find that movie") })
            console.log(e);
        }
    }
}