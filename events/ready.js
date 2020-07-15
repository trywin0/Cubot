let invites = {}
exports.run = (client) => {
    console.log("\x1b[33m|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|");
    console.log("\x1b[33m|     \x1b[37m  Cubot        \x1b[33m|");
    console.log("\x1b[33m|       \x1b[37mReady        \x1b[33m|");
    console.log("\x1b[33m|▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬|");
    client.guilds.cache.forEach(async g => {
        let guildInvites = await g.fetchInvites().catch(e => console.log(e))
        invites[g.id] = guildInvites;
    });
}
exports.invites = invites