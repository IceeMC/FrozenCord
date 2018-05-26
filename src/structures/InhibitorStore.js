class InhibitorStore extends Map {

    constructor() { // eslint-disable-line
        super();
    }

    /**
     * Deletes a Inhibitor from the FrozenMap.
     * @param {string} name The inhibitor to remove.
     */
    delete(name) {
        super.delete(name);
    }

    /**
     * Deletes all of the inhibitors from the Map.
     */
    clear() {
        super.clear();
    }

}

module.exports = InhibitorStore;
