/**
 * A class used for Inhibitors which are
 * fired when a command is successfully ran.
 */
class Inhibitor {

    constructor(client) {
        this.client = client;
        this.name = "";
        this.description = "";
    }

    run(message, command) { // eslint-disable-line
        throw new Error(`Inhibitor run code must be provided for class: ${this.constructor.name}`);
    }

}

module.exports = Inhibitor;
