const { Inhibitor } = require("frozencord"); // eslint-disable-line

class CommandCounter extends Inhibitor {

    constructor(client) { // eslint-disable-line
        super(client);
        this.name = "default";
    }

    run(command) { // eslint-disable-line
        // Do code here
    }

}

module.exports = CommandCounter;
