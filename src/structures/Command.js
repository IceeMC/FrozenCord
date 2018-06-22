const FrozenClient = require("../FrozenClient.js"); // eslint-disable-line

/**
 * A class that is used for commands.
 * @param {FrozenClient} client The FrozenClient that made this command.
 */

class Command {

    constructor(client, {
        category = "",
        name = "",
        description = "",
        aliases = [],
        args = [],
        botPerms = [],
        userPerms = [],
        guildOnly = false,
        ownerOnly = false,
        disabled = false
    }) {
        this.category = category;
        this.client = client;
        this.name = name;
        this.description = description;
        this.aliases = aliases;
        this.args = args;
        this.botPerms = botPerms;
        this.userPerms = userPerms;
        this.guildOnly = guildOnly;
        this.ownerOnly = ownerOnly;
        this.disabled = disabled;
    }

    run(message, args) { // eslint-disable-line
        return message.channel.send(`This command has no run method therefor it cannot be ran.`);
    }

}

module.exports = Command;
