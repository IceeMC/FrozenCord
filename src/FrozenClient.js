const { Client, Message } = require("discord.js"); // eslint-disable-line
const Command = require("./structures/Command.js");
const CommandStore = require("./structures/CommandStore.js");
const AliasStore = require("./structures/AliasStore.js");
const klaw = require("klaw");
const chalk = require("chalk").default;
const { parse, sep } = require("path");

class FrozenClient extends Client {

    constructor(options) {
        super();

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

        this._loadOptions(options);
    }


    /**
     * Loads the options for the bot like prefix, ownerId, and more.
     * @param {Object} options The options Object.
     */
    async _loadOptions(options) {
        const clientApp = await this.fetchApplication();

        /**
         * The prefix for the bot
         * @default "!"
         */
        this.prefix = options.prefix ? options.prefix : "!";

        /**
         * The prefix for the bot if none is provided
         * it gets the owner id from the bot application.
         */
        this.ownerId = options.ownerId ? options.ownerId : clientApp.owner.id;

        /**
         * A boolean to determine if the bot should type while running commands.
         * @default "false"
         */
        this.withTyping = options.typing ? options.typing : false;

        /**
         * The ready message for the bot.
         * @default "Logged in as ${client.user.tag} in ${client.guilds.size}!"
         */
        this.readyMessage = options.readyMessage ? options.readyMessage : `Logged in as ${this.user.tag} in ${this.guilds.size}!`;
    }

    /**
     * Logs the bot in to discord,
     * loads commands, and the command aliases.
     * this also attaches 2 event listeners one is ready,
     * and the other listener is message.
     * @param {string} botToken The token to log the bot in with.
     */
    login(botToken) {
        super.login(botToken)
            .then(() => {
                this._loadDefaultCommands();
                this.on("ready", () => console.log(this.readyMessage));
                this.on("message", (message) => this._handleMessage(message));
            })
            .catch(error => { console.log(`${chalk.bgRedBright("ERROR")} - ${error}`); process.exit(); });
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
        for (const alias of c.aliases) {
            this.aliases.set(alias, c);
        }
    }

    /**
     * Loads all of the clients default commands with their aliases.
     * @private
     */
    _loadDefaultCommands() {
        const started = Date.now();
        klaw("./defaultcommands/")
            .on("data", (commandFile) => {
                const cmd = parse(commandFile.path);
                if (!cmd.ext || cmd.ext !== ".js") return;
                return this._loadCommand(cmd.dir, cmd.name);
            })
            .on("end", () => {
                const endTime = Date.now() - started;
                console.log(`${chalk.bgGreenBright("LOADER")} - Loaded ${this.commands.size} commands, and ${this.aliases.size} aliases in ${endTime.toFixed(2)}ms`);
            });
    }

    /**
     * Handles a message from the guild or pm.
     * @param {Message} message The message object from discord.js.
     */
    async _handleMessage(message) {
        if (!message.content.startsWith(this.prefix) || message.author.bot) return;
        const args = message.content.split(" ");
        const command = args[0].toLowerCase();
        const cmd = this.commands.get(command.slice(this.prefix.length)) || this.aliases.get(command.slice(this.prefix.length));
        if (cmd) {
            // Start typing
            if (this.withTyping) message.channel.startTyping();

            // Checks
            if (cmd.ownerOnly && message.author.id !== this.ownerId) { message.channel.stopTyping(); return; }
            if (cmd.guildOnly && !message.guild) { message.channel.stopTyping(); return; }
            if (!message.guild.me.permissions.has(cmd.botPerms) || !message.member.permissions.has(cmd.userPerms)) { message.channel.stopTyping(); return; }
            cmd.parser.requiredCheck(message, args);

            // Run the command then stop typing after it is ran.
            await cmd.run(message, args);
            message.channel.stopTyping();
        }
    }

}

module.exports = FrozenClient;
