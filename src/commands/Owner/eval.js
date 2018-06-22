const { Command } = require("frozencord"); // eslint-disable-line
const { post } = require("snekfetch");

class Eval extends Command {

    constructor(client) {
        super(client, {
            name: "eval",
            description: "Evaluates JavaScript code.",
            guildOnly: true,
            ownerOnly: true,
            args: [
                {
                    name: "code",
                    type: "string",
                    required: true
                }
            ],
            botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            aliases: ["ev", "boteval"]
        });
    }

    replace(output) {
        return output
            .replace(new RegExp(this.client.token), "Nani?");
    }

    haste(text) {
        return post(`https://hastebin.com/documents`)
            .send(text).then(r => {
                const url = `https://hastebin.com/${r.body.key}`;
                return url;
            });
    }

    async run(message, [code]) {
        try {
            let output = eval(code);
            const outputType = eval(code);
            if (typeof output !== "string") { output = await require("util").inspect(output, { maxDepth: 0, showHidden: true }); }
            if (output.length > 1850) {
                const hasteUrl = await this.haste(this.replace(output));
                message.channel.send(`
**Input:**
\`\`\`xl\n${code}\`\`\`

**Output:**
\`\`\`xl\n${hasteUrl}\`\`\`

**Type:** \`${typeof outputType}\`
                `);
            } else {
                message.channel.send(`
**Input:**
\`\`\`xl\n${code}\`\`\`

**Output:**
\`\`\`xl\n${output}\`\`\`

**Type:** \`${typeof outputType}\`
                `);
            }
        } catch (error) {
            message.channel.send(`
**Input:**
\`\`\`xl\n${code}\`\`\`

**Error:**
\`\`\`xl\n${error.message}\`\`\`

**Error Type:** \`${typeof error}\``);
        }
    }

}

module.exports = Eval;
