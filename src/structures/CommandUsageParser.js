const Command = require("./Command.js");

class CommandUsageParser extends Command {

    constructor() {
        super();
        this.total = [];
        this.required = [];
        this.checked = [];
    }

    requiredCheck(message, messageArgs) {
        for (const arg of messageArgs) {
            for (const r of this.required) r.arg = arg;
            if (!this.checked.indexOf(arg)) {
                return message.channel.send(`${this.required.find("arg", arg).argument} is a required argument but was not found.`);
            } else {
                this.checked.push(arg);
            }
        }
    }

    /**
     * Parses a string and returns it as a command argument.
     * @param {string} toSplitAndMatch The command usage string to parse.
     */
    parse(toSplitAndMatch) {
        for (const split of toSplitAndMatch.split(" ")) {
            const notRequired = /\[(.*):(user|number|string)\]/.exec(split);
            const required = /\{(.*):(user|number|string)\}/.exec(split);
            if (notRequired) {
                this.args.push({
                    argument: notRequired[1],
                    type: notRequired[2],
                    arg: ""
                });
            } else if (required) {
                this.required.push({
                    argument: required[1],
                    type: required[2],
                    arg: ""
                });
            }
        }
    }

}

module.exports = CommandUsageParser;
