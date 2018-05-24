const Command = require("../../structures/Command.js");

class Eval extends Command {

    constructor() {
        super();
        this.guildOnly = true;
        this.ownerOnly = true;
        this.usage = "{code:string}";
        this.botPerms = ["SEND_MESSAGES", "EMBED_LINKS"];
    }

    async run(message, [code]) {
        const evaled = eval(code);
        try {
            message.channel.send(`
**Input:**
\`\`\`xl\n${code}\`\`\`

**Output:**
\`\`\`xl\n${evaled.replace(new RegExp(this.client.token), "Nani?")}\`\`\``);
        } catch (error) {
            message.channel.send(`
**Input:**
\`\`\`xl\n${code}\`\`\`

**Error:**
\`\`\`xl\n${error.message}\`\`\``);
        }
    }

}

module.exports = Eval;