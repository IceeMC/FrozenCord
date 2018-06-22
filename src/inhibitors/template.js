const { Inhibitor } = require("frozencord"); // eslint-disable-line

class CommandCounter extends Inhibitor {

    constructor(client) { // eslint-disable-line
        super(client, {
            name: "template",
            description: "template inhibitor that is run when a users command has finished running."
        });
    }

    run(message, command) { // eslint-disable-line
        // Do code here
    }

}

module.exports = CommandCounter;
