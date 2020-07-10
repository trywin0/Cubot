const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./handler.js', { token: "NzIyODA3NDU3Nzc2MTQwMzE5.XwRYoA.T1NqRys4pHICDOGSpV4RCntyqlo" });
manager.spawn();
manager.on('shardCreate', shard => {
    console.log(`Launched shard ${shard.id}`)
});