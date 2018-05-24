const { Message } = require("discord.js"); // eslint-disable-line
const CommandUsageParser = require("./CommandUsageParser");

class Command {

    constructor(client) {
        /**
         * The Client that loaded this command.
         * @type {FrozenClient}
         */
        this.client = client;

        /**
         * The aliases for this command can be none.
         * @type {Array<String>}
         */
        this.aliases = [];

        /**
         * The permissions the bot needs to run the command.
         * @type {Array<String>}
         */
        this.botPerms = [];

        /**
         * The permissions the user needs to run the command.
         */
        this.userPerms = [];

        /**
         * Wether the command should be guild only or not.
         */
        this.guildOnly = true;

        /**
         * If the command should be disabled or not.
         */
        this.disabled = false;

        /**
         * Wether the command should be for the bot owner.
         */
        this.ownerOnly = false;

        /**
         * The usage for the command.
         * {} means its required
         * [] means its optional
         */
        this.usage = "";

        /**
         * The description for the command.
         */
        this.description = "";

        /**
         * The command parser for the command.
         */
        this.parser = new CommandUsageParser(this.client);

        this.parser.parse(this.usage);
    }

    async run(message, args) { // eslint-disable-line
        return message.channel.send(`This command has no run method theirfor it cannot be ran.`);
    }

}

module.exports = Command;
