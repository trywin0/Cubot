const Discord = require("discord.js"),
    client = new Discord.Client(),
    fs = require("fs"),
    config = require("./config.json");
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (file.endsWith(".js")) return;
        fs.readdir(`./commands/${file}/`, (err, filess) => {
            if (err) return console.log(err);
            filess.forEach(f => {
                let props = require(`./commands/${file}/${f}`);
                console.log("Successfully loaded " + f)
                let commandName = f.split(".")[0];
                props.category = file
                client.commands.set(commandName, props);
            })
        });

    });
});
const mongoose = require("mongoose");

// mongoose connection
mongoose.connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.once('open', async() => {
    const date = new Date(new Date().setHours(new Date().getUTCHours() + 1));
    console.log('	> ' + date.toLocaleDateString('es', {
        minute: '2-digit',
        hour: '2-digit',
        day: 'numeric',
        month: '2-digit',
        year: 'numeric'
    }));
    console.log('	> Successfully connected to the database.');
});
db.on('error', (err) => {
    console.error(err);
    console.log('	> Error in the connection to the database.');
});
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        console.log("Successfully loaded " + file)
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});
const MusicBot = require("discord-music-system"); // Require the module

const bot = new MusicBot({ // Create the bot
    token: config.token, // You can find the token at https://discord.com/developers/applications/
    ytApiKey: config.ytKey, // Video to explain how to get it: https://www.youtube.com/watch?v=VqML5F8hcRQ
    prefix: '/', // Example: / // Example: /help
    game: "/help"
});

bot.run(); // Run the bots
client.login(config.token)