const FrozenMap = require("../utils/FrozenMap.js");

class AliasStore extends FrozenMap {

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
