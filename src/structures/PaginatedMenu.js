const { RichEmbed } = require("discord.js");

/**
 * A class for a paginated menu / paginator.
 * this paginator is customizable.
 */
class PaginatedMenu {

    constructor(message) {
        this.message = message;
        this.reactor = message.author;
        this.enabled = false;
        this.current = 0;
        this.pages = [];
        this._reactionCollector = null;
        this._messageCollector = null;
        this._sent = null;
        this.emojis = ["⏸", "⏪", "⬅", "➡", "⏩", "🔢"];
    }

    /**
     * Checks if a hex code invalid.
     * @param {number} code The hex code to validate.
     * @returns {boolean}
     * @private
     */

    /**
     * Adds a page to the pages.
     * @param {string} title The page title
     * @param {string} description The page description
     * @returns {number} The length of the pages.
     */
    addPage(title, description) {
        return this.pages.push({
            title: title,
            description: description
        });
    }

    /**
     * Adds a single page at a time to the pages array.
     * @param {Array} pages An object of pages.
     * @returns {number} The new length of the pages.
     */
    addPages(pages) {
        for (const page of pages) {
            this.pages.push(page);
        }
        return this.pages.length;
    }

    /**
     * Sets the title for the embed.
     * @param {string} title The title string.
     */
    setTitle(title) {
        this.title = title;
        return;
    }

    /**
     * Sets the color for the embed.
     * @param {number} color The color you want.
     * @default 0xffffff
     */
    setColor(color) {
        this.color = color;
        return;
    }

    /**
     * Sets the description of the embed.
     * @param {string} description The description of the embed.
     */
    setDescription(description) {
        this.description = description;
        return;
    }

    /**
     * Runs the pagination session.
     */
    async start() {
        console.log(this.pages);
        if (!this.pages[0]) throw new Error("Pages cannot be empty.");
        if (!this.enabled) await this._switchPage(0);
        this._reactionCollector = this._sent.createReactionCollector((reaction, user) => this.emojis.includes(reaction.emoji.name) && user.id === this.reactor.id && reaction.remove(user).catch(() => {}), { time: 864e5 });
        this._reactionCollector.on("collect", async r => {
            switch (r.emoji.name) {
            case "⏸": { await this._end(); break; }
            case "⏪": { await this._firstPage(); break; }
            case "⬅": { await this._backward(); break; }
            case "➡": { await this._forward(); break; }
            case "⏩": { await this._lastPage(); break; }
            case "🔢": { await this._switchFromMessage(); break; }
            }
        });
        this._reactionCollector.on("end", () => this._end());
    }

    /**
     * Checks if the provided page number is invalid.
     * @param {number} pageNumber The page number to check.
     * @returns {boolean}
     * @private
     */
    _invalidPage(pageNumber) {
        if (/-.*/.exec(pageNumber.toString()) || pageNumber === this.pages.length) return true;
        return false;
    }

    /**
     * Switches the paginator to the specified page.
     * @param {number} pageNumber The page number to switch too.
     * @private
     */
    async _switchPage(pageNumber) {
        // Wait for valid page
        console.log(this._invalidPage(pageNumber));
        if (this._invalidPage(pageNumber)) return;

        /* Set the current page to the one the
        * user wants to switch too.
        */
        this.current = pageNumber;

        if (this.enabled) {
            this._sent.edit(
                new RichEmbed()
                    .addField(...this.pages[0])
                    .setColor(this.color || 0xffffff)
                    .setTitle(this.title || null)
                    .setFooter(`Showing page ${this.current + 1} of ${this.pages.length}`)
            );
            return;
        } else {
            // Enable the paginator, send the message, and react.
            this.enabled = true;
            this._sent = await this.message.channel.send(
                new RichEmbed()
                    .addField(this.pages[0].title, this.pages[0].description)
                    .setColor(this.color || 0xffffff)
                    .setTitle(this.title || null)
                    .setFooter(`Showing page ${this.current + 1} of ${this.pages.length}`)
            );
            for (const emoji of this.emojis) {
                if (["⏪", "⏩", "🔢"] && this.pages.length < 2) { continue; } else {
                    await this._sent.react(emoji);
                }
            }
        }
    }

    async _forward() {
        return await this._switchPage(this.current + 1);
    }

    async _backward() {
        return await this._switchPage(this.current - 1);
    }

    async _firstPage() {
        return await this._switchPage(0);
    }

    async _lastPage() {
        return await this._switchPage(this.pages.length - 1);
    }

    async _switchFromMessage() {
        const temp = await this.message.channel.send(`
${this.reactor}, What page would you like to go to?

This times out in 60 seconds.
To cancel type \`cancel\` or \`stop\`.`);
        this._messageCollector = this.message.createMessageCollector(m => m.author.id === this.reactor.id && m.channel.id === this.message.channel, { time: 60000 });
        this._messageCollector.on("collect", async m => {
            if (/cancel|stop/.exec(m.content)) {
                temp.delete();
                this._messageCollector.stop();
                this._messageCollector = null;
                return;
            }
            if (!this.pages[parseInt(m.content)]) {
                const tmp = await this.message.channel.send(`Invalid page \`[${m.content}/${this.pages.length}]\``);
                setTimeout(() => tmp.delete(), 1500);
            } else { await this._switchPage(parseInt(m.content)); }
            temp.delete();
            this._messageCollector.stop();
            this._messageCollector = null;
        });
    }

    async _end() {
        if (this._messageCollector) this._messageCollector.stop();
        await this._sent.delete();
    }

}

module.exports = PaginatedMenu;
