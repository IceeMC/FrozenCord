const { Command } = require("frozencord"); // eslint-disable-line

class Help extends Command {

    constructor(client) {
        super(client);
        this.name = "help";
        this.description = "Displays the help for the bot.";
        this.guildOnly = true;
        this.args = [
            {
                name: "command",
                type: "string"
            }
        ];
    }

}

module.exports = Help;
