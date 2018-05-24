const FrozenMap = require("../utils/FrozenMap.js");

class CommandStore extends FrozenMap {

    constructor() { // eslint-disable-line
        super();
    }

    /**
     * Deletes a command from the FrozenMap.
     * @param {string} name The command to remove.
     */
    delete(name) {
        super.delete(name);
    }

    /**
     * Deletes all of the commands from the FrozenMap.
     */
    clear() {
        super.clear();
    }

}

module.exports = CommandStore;
