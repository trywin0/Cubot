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
fs.readdir('./events/', (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
        let eventFunc = require(`./events/${file}`);
        console.log("Successfully loaded " + file)
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunc.run(client, ...args));
    });
});
client.login(config.token)