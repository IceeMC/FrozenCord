class AliasStore extends Map {

    constructor() { // eslint-disable-line
        super();
    }

    /**
     * Deletes a alias from the FrozenMap.
     * @param {string} name The alias to remove.
     */
    delete(name) {
        super.delete(name);
    }

    /**
     * Deletes all of the aliases from the FrozenMap.
     */
    clear() {
        super.clear();
    }

}

module.exports = AliasStore;
