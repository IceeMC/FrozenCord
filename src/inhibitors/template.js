const { Inhibitor } = require("frozencord"); // eslint-disable-line

class CommandCounter extends Inhibitor {

    constructor(client) { // eslint-disable-line
        super(client);
        this.name = "template";
        this.description = "template inhibitor that is run when a users command has finished running.";
    }

    run(message, command) { // eslint-disable-line
        // Do code here
    }

}

module.exports = CommandCounter;
