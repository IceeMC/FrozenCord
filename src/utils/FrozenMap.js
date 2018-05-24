/**
 * A Custom take on the Map class,
 * this adds more features to the map
 * like getting random keys, random values, and more.
 * @extends {Map}
 */

class FrozenMap extends Map {

    constructor(items) { // eslint-disable-line
        super(items);
    }

    /**
     * Turns the Map into an Array.
     * @returns {Array}
     */
    toArray() {
        return Array.from(this.values());
    }

    /**
     * Grabs a random key from the Map.
     * @returns {Array}
     */
    randomKey() {
        const keys = [...this.keys()];
        return keys[Math.floor(Math.random() * keys.length)];
    }

    /**
     * Grabs a random value from the Map.
     * @returns {Array}
     */
    randomValue() {
        const values = [...this.values()];
        return values[Math.floor(Math.random() * values.length)];
    }

    /**
     * Returns the first key of the Map.
     * @returns {any}
     */
    firstKey() {
        return this.keys().next().value;
    }

    /**
     * Returns the first value of the Map.
     * @returns {any}
     */
    firstValue() {
        return this.values().next().value;
    }

}

module.exports = FrozenMap;
