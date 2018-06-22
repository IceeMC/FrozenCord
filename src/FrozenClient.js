const Discord = require("discord.js"); // eslint-disable-line
const Command = require("./structures/Command.js"); // eslint-disable-line
const CommandStore = require("./structures/CommandStore.js");
const AliasStore = require("./structures/AliasStore.js");
const Inhibitor = require("./structures/Inhibitor.js"); // eslint-disable-line
const InhibitorStore = require("./structures/InhibitorStore.js"); // eslint-disable-line
const klaw = require("klaw");
const chalk = require("chalk").default;
const { join, parse, sep } = require("path");
const fs = require("fs");
const { ncp } = require("ncp"); // eslint-disable-line

class FrozenClient extends Discord.Client {

    constructor(clientOptions) {
        super();
        this.clientOptions = clientOptions;

        /**
         * Stores all of the bots commands.
         * @type {Map<String, Command>}
         */
        this.commands = new CommandStore();

        /**
         * Stores all of the commands aliases.
         * @type {Map<String, Command>}
         */
        this.aliases = new AliasStore();

        /**
         * Stores all of the inhibitors when a command is ran.
         * @type {Map<String, Inhibitor>}
         */
        this.inhibitors = new InhibitorStore();
    }


    /**
     * Loads the options for the bot like ownerId, readyMessage, defaultGame, and more.
     * @param {Object} clientOptions The options Object.
     */
    async _loadOptions({ prefix, withTyping, ownerId, readyMessage, game } = {}) {
        const app = await this.fetchApplication();

        /**
         * The prefix for the bot
         * @default "!"
         */
        this.prefix = prefix || "!";

        /**
        * A boolean to determine if the bot should type while running commands.
        * @default false
        */
        this.withTyping = withTyping || false;

        /**
         * The ownerId for the bot if none is provided
         * it gets the owner id from the bot application
         */
        this.ownerId = ownerId || app.owner.id;

        /**
         * The ready message for the bot.
         * @default "Bot Logged in as ${tag} and serving in ${guilds} guilds."
         */
        this.readyMessage = readyMessage(this) || `Bot Logged in as ${this.user.tag} and serving in ${this.guilds.size > 1 ? `${this.guilds.size} guilds` : `1 guild`}.`;

        /**
         * The presence the bot should startup with.
         * @default "Streaming with ${guilds}guilds | ${prefix}help"
         */
        this.game = game || { url: "https://twitch.tv/iceemc", name: `with ${this.guilds.size > 1 ? `${this.guilds.size} guilds` : `1 guild`} | ${this.prefix}help`, type: 1 };
    }

    /**
     * Logs the bot in to discord,
     * loads commands, and the command aliases.
     * this also attaches 2 event listeners one is ready,
     * and the other listener is message.
     * @param {string} token The token to log the bot in with.
     * @returns {Promise<string>} A logged in client.
     */
    async login(token) {
        this._extractCommands();
        this._extractInhibitors();

        // Add the 2 event listeners
        this._attachEvents();
        return super.login(token);
    }

    /**
     * Gets the category the command belongs in.
     * @param {string} parsedPath The path to the command.
     * @returns {string} The category
     */
    _getCategory(parsedPath) {
        const dirs = fs.readdirSync("./commands/");
        for (let i = 0; i < dirs.length; i++) {
            for (const pathSplit of parsedPath.split("\\")) {
                if (pathSplit === dirs[i]) return dirs[i];
            }
        }
    }

    /**
     * Attaches event listeners to the bot.
     * @private
     */
    _attachEvents() {
        this.on("ready", async () => {
            await this._loadOptions(this.clientOptions);
            this.user.setActivity(this.game.name || this.game.name(this), { url: this.game.url, type: this.game.type });
            console.log(`${chalk.bgBlueBright("INFO")} ${this.readyMessage}`);
        });
        this.on("message", message => this._handleMessage(message));
        process.on("unhandledRejection", e => console.log(`${chalk.bgRedBright("ERROR")}${chalk.redBright(e.stack)}`));
    }

    /**
     * Loads or extracts the bots command directory.
     * @private
     */
    _extractCommands() {
        if (!fs.existsSync(join(__dirname, "..", "..", "..", "commands"))) {
            fs.mkdir(join(__dirname, "..", "..", "..", "commands", "."), () => {
                ncp(join(__dirname, ".", "commands"), join(__dirname, "..", "..", "..", "commands", "."), () => {
                    this._loadCommands();
                });
            });
        } else { this._loadCommands(); }
    }

    /**
     * Loads or extracts the bots inhibitor directory.
     * @private
     */
    _extractInhibitors() {
        if (!fs.existsSync(join(__dirname, "..", "..", "..", "inhibitors"))) {
            fs.mkdir(join(__dirname, "..", "..", "..", "inhibitors", "."), () => {
                ncp(join(__dirname, ".", "inhibitors"), join(__dirname, "..", "..", "..", "inhibitors", "."), () => {
                    this._loadInhibitors();
                });
            });
        } else { this._loadInhibitors(); }
    }

    /**
     * Loads a command.
     * @param {string} path The path of the command.
     * @param {string} command The command file to load.
     * @private
     */
    _loadCommand(path, command) {
        const c = new (require(`${path}${sep}${command}`))(this);
        this.commands.set(c.name, c);
        this.commands.get(c.name).category = this._getCategory(path);
        for (const alias of c.aliases) {
            this.aliases.set(alias, c);
        }
    }

    /**
     * Loads all of the clients commands with their aliases.
     * @private
     */
    _loadCommands() {
        const started = Date.now();
        klaw("./commands/")
            .on("data", commandFile => {
                const cmd = parse(commandFile.path);
                if (!cmd.ext || cmd.ext !== ".js") return;
                return this._loadCommand(cmd.dir, cmd.name);
            })
            .on("end", () => {
                console.log(`${chalk.bgBlueBright("INFO")} Loaded ${this.commands.size} commands, and ${this.aliases.size} aliases in ${(Date.now() - started).toFixed(2)}ms.`);
            });
    }

    /**
     * Loads an inhibitor for the bot.
     * @param {string} path The path to the inhibitor
     * @param {string} inhibitor The name of the inhibitor to load.
     */
    _loadInhibitor(path, inhibitor) {
        const i = new (require(`${path}${sep}${inhibitor}`))(this);
        this.inhibitors.set(i.name, i);
    }

    /**
     * Loads all of the inhibitors for the bot
     * @private
     */
    _loadInhibitors() {
        const startTime = Date.now();
        klaw("./inhibitors/")
            .on("data", inhibitorFile => {
                const i = parse(inhibitorFile.path);
                if (!i.ext || i.ext !== ".js") return;
                return this._loadInhibitor(i.dir, i.name);
            })
            .on("end", () => {
                console.log(`${chalk.bgBlueBright("INFO")} Loaded ${this.inhibitors.size} inhibitors in ${(Date.now() - startTime).toFixed(2)}ms.`);
            });
    }

    /**
     * Unloads a command from the bot.
     * @param {string} command The command to unload.
     */
    unloadCommand(command) {
        this.commands.delete(command.name);
    }

    /**
     * Handles a message from the guild or pm.
     * @param {Discord.Message} message The message object from discord.js.
     */
    async _handleMessage(message) {
        if (!message.content.toLowerCase().startsWith(this.prefix)) return;

        const args = message.content.toLowerCase().slice(this.prefix.length).split(" ");
        const command = args.shift().toLowerCase();
        const cmd = this.commands.get(command) || this.aliases.get(command);

        if (cmd) {
            // Start typing if its enabled.
            if (this.withTyping) message.channel.startTyping();

            // Checks if a command is for the owner or if it needs to be in a guild and the bot and user permissions.
            if (cmd.ownerOnly && message.author.id !== this.ownerId) { message.channel.stopTyping(true); return; }
            if (cmd.guildOnly && !message.guild) { message.channel.stopTyping(true); return; }
            if (!message.guild.me.permissions.has(cmd.botPerms) || !message.member.permissions.has(cmd.userPerms)) { message.channel.stopTyping(true); return; }

            const CommandArguments = new (require("./structures/CommandArguments.js"))(this);
            CommandArguments.check(message, cmd, args, async () => {
                // Run the command then stop typing after it is ran.
                try {
                    cmd.run(message, CommandArguments.args);
                } catch (error) {
                    this.emit("commandError", (cmd, error));
                }

                // Run all inhibitors for the bot after the command has finished.
                this.inhibitors.forEach(async i => await i.run(message, cmd));
                if (this.withTyping) message.channel.stopTyping(true);

                // After the command clean up the args.
                CommandArguments.cleanUp();
            }, () => {
                if (this.withTyping) message.channel.stopTyping(true);
                CommandArguments.cleanUp();
            });
        } else {
            this.emit("commandUnknown", cmd);
        }
    }

}

module.exports = FrozenClient;
