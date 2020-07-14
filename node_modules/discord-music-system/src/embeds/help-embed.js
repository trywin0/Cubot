'use strict';

const DefaultEmbed = require('./default-embed');

/**
 * Help message embed.
 *
 * @class
 * @extends DefaultEmbed
 */
class HelpEmbed extends DefaultEmbed {
	constructor(commandFiles, prefix) {
		super();
		this.setTitle('📌 Commands');
		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			this.addField(`${prefix}${command.name}`, `\`${command.description}\``);
		}
	}
}

module.exports = HelpEmbed;