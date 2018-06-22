const { Command } = require("frozencord"); // eslint-disable-line

class Help extends Command {

    constructor(client) {
        super(client, {
            name: "help",
            description: "Displays the help menu for the bot.",
            args: [
                {
                    name: "command",
                    type: "string"
                }
            ]
        });
    }

    async run(message, [command]) {
        let currentCat = "";
        let helpStr = "";
        if (!command) {
            for (const [name, cmd] of this.client.commands) {
                if (currentCat !== cmd.category) {
                    currentCat = cmd.category;
                    helpStr += `\n\n== **${cmd.category}** ==\n`;
                }
                const required = cmd.args.filter(a => a.required).map(a => `{${a.name}}`).join(" ");
                const notRequired = cmd.args.filter(a => !a.required).map(a => `[${a.name}]`).join(" ");
                const usageString = `${this.client.prefix}${name} ${required}${notRequired}`;
                helpStr +=
`**${this.client.prefix}${name}**: \`${cmd.description || "No description provided."}\`
    ↳ Aliases: ${cmd.aliases.map(a => `\`${a}\``).join(", ") || "None"}
        ↳ Usage: ${usageString}
            ↳ Permissions:
                ↳ Bot: ${cmd.botPerms.map(p => `***${p.replace("_", " ")}***`).join(", ") || "None"}
                ↳ User: ${cmd.userPerms.map(p => `***${p.replace("_", " ")}***`).join(", ") || "None"}
`;
            }
            await message.channel.send(helpStr, { split: true });
        } else {
            const cmd = this.client.commands.get(command);
            if (cmd) {
                const required = cmd.args.filter(a => a.required).map(a => `{${a.name}}`).join(" ");
                const notRequired = cmd.args.filter(a => !a.required).map(a => `[${a.name}]`).join(" ");
                const usageString = `${this.client.prefix}${cmd.name} ${required}${notRequired}`;
                const aliasString = cmd.aliases.join(", ") || "None";
                message.channel.send(`= Understanding arguments =\n{} means the argument is required\n[] means the argument is not required\n\n= ${cmd.name} =\nUsage: ${usageString}\nDescription: ${cmd.description || "No description provided."}\nAliases: ${aliasString}`, { code: "asciidoc" });
            }
        }
    }

}

module.exports = Help;
