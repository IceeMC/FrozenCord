const chalk = require("chalk").default;

/**
 * This Class checks for arguments.
 */
class CommandArgs {

    constructor(client) {
        this.client = client;
        this.total = [];
        this.required = [];
        this.checked = [];
        this.msgArgs = [];
        this.message = null;
    }

    /**
     * Cleans up the Class.
     */
    cleanUp() {
        this.client = null;
        this.total = [];
        this.required = [];
        this.checked = [];
        this.msgArgs = [];
    }

    check(message, command, args, success = () => {}, failed = () => {}) {
        if (command.args.length === 0) return success();
        this.message = message;
        this.msgArgs = args;
        for (let i = 0; i < command.args.length; i++) {
            if (!args[i] && command.args[i].required) { return message.channel.send(`**${command.args[i].name}** is a required argument but was not found!`); } else {
                this.returnArgument(command.args[i], i)
                    .then(() => success())
                    .catch(() => failed());
            }
        }
    }

    returnArgument(argument, pos) {
        return new Promise(async (res, rej) => {
            switch (argument.type) {
            case "string": {
                return res(this.checked.push(this.msgArgs.join(" ")));
            }
            case "user": {
                const member = this.message.mentions.members.first() || this.message.guild.members.filter(m => m.user.tag.includes(this.msgArgs[pos]) || m.user.id === this.msgArgs[pos]).first();
                if (member === undefined) return rej("NO_USER_FOUND");
                return res(this.checked.push(member.user));
            }
            default: console.error(`${chalk.bgRedBright("ERROR")} Unknown argument type: ${argument.type}`);
            }
        });
    }

    /**
     * Puts the propper arguments in the propper category.
     * @param {string} command The command to use for args.
     */
    run(command) {
        for (const argument of command.args) {
            this.total.push(argument);
            if (argument.required) this.required.push(argument);
            else this.required.push(argument);
        }
    }

    get args() {
        return this.checked;
    }

}

module.exports = CommandArgs;
