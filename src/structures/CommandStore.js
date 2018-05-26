class CommandStore extends Map {

    constructor() { // eslint-disable-line
        super();
    }

    /**
     * Deletes a command from the Map.
     * @param {string} name The command to remove.
     */
    delete(name) {
        super.delete(name);
    }

    /**
     * Deletes all of the commands from the Map.
     */
    clear() {
        super.clear();
    }

}

module.exports = CommandStore;
