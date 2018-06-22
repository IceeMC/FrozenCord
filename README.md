# FrozenCord
A Discord.js command framework.

# Installing
To install *dev version* run: `npm install https://github.com/IceeMC/FrozenCord`

To install run `npm install frozencord`

# Support
To get support with anything reguarding this framework or d.js you can join the support server [here](https://discord.gg/GRj8sMw)

# Features
- Commands - Wether you are making simple commands or complex commands this framework can do it.
- Inhibitors - Wether you want to do command counts or log who ran what command this framework can do that.
- Events - Handle events like a pro in your own event system or in the main file.
- PaginatedMenu - Paginate items with ease no really its that simple.

More coming soon.

# Heroku user?
Step 1: Download this repo on your pc/mac.

Step 2: Copy the `commands` and `inhibitors` directory located in the `src` directory to the repo you want the bot in.

Step 3: Push the changes and run the commands below.
- First off run `git add .`
- After that then run `git commit -am "Add commands and inhibitors"`
- After that then run `git push`

# Client example:
```js
const { FrozenClient } = require("frozencord");
const client = new FrozenClient({
    prefix: "." // Set this to what ever you want the default is !.
    withTyping: true // Set this to false if you don't want the bot to type when running commands.
    ownerId: "" // A string of the owners id. Default is the id gotten from the client application.
    readyMessage: (client) => `Ready as ${client.user.tag}` // The ready message for the client.
    game: {
        name: "cards of humanity",
        type: "PLAYING"
    } // Sets the game of the bot.
});

client.login("Token here");
```

# Command example:
```js
const { Command } = require("frozencord");

class CommandName extends Command {

    constructor(client) {
        super(client, {
            name: "commandName", // The name of the command
            description: "A command that can do cool stuff.", // The description of the command.
            aliases: [], // An array of strings *optional*
            args: [
                {
                    name: "argument",
                    type: "string",
                    required: true, // by default this is false but set it to true if you wish
                }
            ], // An array of ArgsObject's *optional*
            botPerms: ["SEND_MESSAGES"], // An array of permissions the bot should have when the command is ran *optional*.
            userPerms: [], // An array of permissions the user should have when the command is ran *optional*.
            guildOnly: true, // Set this to false if you want it to be ran in pms
            ownerOnly: false, // Set this to true if you want the bot owner to be the one who can run this command.
            disabled: false // Set this to true if you want this command to be disabled.
        });
    }

    // What the command does when its ran.
    async run(message, [argument]) {
        message.channel.send(argument);
    }

}

module.exports = CommandName;
```

# Inhibitor example:
```js
const { Inhibitor } = require("frozencord");

class InhibitorName extends Inhibitor {

    constructor(client) {
        super(client, {
            name: "inhibitorName", // The name of this inhibitor.
            description: "A inhibitor that can do cool things." // The description of the inhibitor.
        });
    }

    // What the inhibitor should do after a command is executed.
    async run(message, command) {
        console.log(`${message.author.tag} ran ${command.name}`);
    }

}

module.exports = InhibitorName;
```

# PaginatedMenu example:
```js
const { PaginatedMenu } = require("frozencord");

const menu = new PaginatedMenu(bot);
menu.setTitle("Example"); // Sets the title to Example.
menu.setColor(0x000000); // Sets the embed color to black.
menu.setDescription("Example paginated menu.");
menu.addPages([
    {
        title: "Page #1 title",
        description: "Page #1 description"
    },
    {
        title: "Page #2 title",
        description: "Page #2 description"
    },
    {
        title: "Page #3 title",
        description: "Page #3 description"
    },
    {
        title: "Page #4 title",
        description: "Page #4 description"
    }
]); // Adds 4 pages.
menu.addPage("Page #5 title", "Page #5 description"); // Adds a single page.
menu.start(); // Starts the menu.
```