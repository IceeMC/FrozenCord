const { Command } = require("frozencord"); // eslint-disable-line

class FindUser extends Command {

    constructor(client) {
        super(client);
        this.name = "finduser";
        this.description = "Finds a user via id or search";
        this.guildOnly = true;
        this.args = [
            {
                name: "user",
                type: "user",
                required: true
            }
        ];
        this.botPerms = ["SEND_MESSAGES", "EMBED_LINKS"];
    }

    run(message, [user]) {
        message.channel.send(`User found: ${user.tag}`);
    }

}
module.exports = FindUser;
