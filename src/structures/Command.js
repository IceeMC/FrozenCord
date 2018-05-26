const FrozenClient = require("../FrozenClient.js"); // eslint-disable-line

/**
 * A class that is used for commands.
 * @param {client} client The Discord.JS that created this command.
 */

class Command {

    constructor(client) {
        this.client = client;
        this.name = "";
        this.description = "";
        this.aliases = [];
        this.args = [];
        this.botPerms = [];
        this.userPerms = [];
        this.guildOnly = true;
        this.ownerOnly = false;
        this.disabled = false;
    }

    async run(message, args) { // eslint-disable-line
        return message.channel.send(`This command has no run method therefor it cannot be ran.`);
    }

}

module.exports = Command;
