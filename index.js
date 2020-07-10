const { ShardingManager } = require('discord.js');
const { token } = require("./config.json")
const manager = new ShardingManager('./handler.js', { token: token, totalShards: 'auto', });
manager.spawn();
manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
});