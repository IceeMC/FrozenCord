const chalk = require("chalk").default;

/**
 * This Class checks for arguments on commands.
 */
class CommandArguments {

    constructor(client) {
        this.client = client;
        this.total = [];
        this.required = [];
        this.checked = [];
        this.msgArgs = [];
        this.message = null;
    }

    cleanUp() {
        this.client = null;
        this.total = [];
        this.required = [];
        this.checked = [];
        this.msgArgs = [];
        this.message = null;
    }

    check(message, command, args, success = () => {}, failed = () => {}) {
        for (const argument of command.args) {
            this.total.push(argument);
            if (argument.required) this.required.push(argument);
            else this.required.push(argument);
        }
        if (command.args.length === 0) return success();
        this.message = message;
        this.msgArgs = args;
        for (let i = 0; i < command.args.length; i++) {
            if (!args[i] && command.args[i].required) { return message.channel.send(`**${command.args[i].name}** is a required argument but was not found.`); } else {
                this.returnArgument(command.args[i], i)
                    .then(() => success())
                    .catch(() => failed());
            }
        }
    }

    returnArgument(argument, pos) {
        return new Promise(async (res, rej) => {
            switch (argument.type) {
            case "single-string": {
                return res(this.checked.push(this.msgArgs[pos]));
            }
            case "string": {
                return res(this.checked.push(this.msgArgs.join(" ")));
            }
            case "member": {
                const member = this.message.mentions.members.first() || this.message.guild.members.filter(m => m.user.tag.includes(this.msgArgs[pos]) || m.user.id === this.msgArgs[pos]).first();
                if (member === undefined) return rej("NO_USER_FOUND");
                return res(this.checked.push(member));
            }
            case "number": {
                if (isNaN(this.msgArgs[pos])) return rej("NOT_A_NUMBER");
                return res(parseInt(this.msgArgs[pos]));
            }
            default: console.error(`${chalk.bgRedBright("ERROR")} Unknown argument type: ${argument.type}`);
            }
        });
    }

    get args() {
        return this.checked;
    }

}

module.exports = CommandArguments;
