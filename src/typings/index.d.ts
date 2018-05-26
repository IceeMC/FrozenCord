declare module "frozencord" {

    import {
        Client,
        Message,
        User
    } from "discord.js";

    export class FrozenClient {
        public constructor(options: OptionsObject);

        public prefix: string;
        public withTyping: boolean;
        public readyMessage: string;
        public ownerId: string;
        public game: GameObject;

        public client: Client;
        public commands: Map<string, Command>;
        public aliases: Map<string, Command>;
        public inhibitors: Map<string, Inhibitor>;

        public login(token): void;
        public unloadCommand(command: Command): void;
    }

    // Inhibitor
    export class Inhibitor {
        public constructor(client: FrozenClient);

        public name: string;
        public description: string;

        public run(message: Message, command: Command): void;
    }

    // Command
    export class Command {
        public constructor(client: FrozenClient);

        public client: FrozenClient;
        public name: string;
        public description: string;
        public aliases: Array<string>;
        public args: Array<ArgsObject>;
        public botPerms: Array<Permissions>;
        public userPerms: Array<Permissions>;
        public ownerOnly: boolean;
        public guildOnly: boolean;
        public disabled: boolean;

        public run(message: Message, args: (string | User)[]): void;
    }

    // JSON Object types
    type OptionsObject = {
        prefix: string,
        withTyping: boolean
        ownerId: string,
        readyMessage: string,
        game: GameObject
    };

    type GameObject = {
        name: string,
        url?: string,
        type: "PLAYING" | "STREAMING" | "WATCHING" | "LISTENING" | number
    }

    type ArgsObject = {
        name: string,
        type: "string" | "user",
        required?: boolean
    }

    // Permissions
    type Permissions = "ADMINISTRATOR" |
        "ADD_REACTIONS" |
        "CREATE_INSTANT_INVITE" |
        "KICK_MEMBERS" |
        "BAN_MEMBERS" |
        "MANAGE_CHANNELS" |
        "MANAGE_GUILD" |
        "VIEW_AUDIT_LOG" |
        "VIEW_CHANNEL" |
        "SEND_MESSAGES" |
        "SEND_TTS_MESSAGES" |
        "MANAGE_MESSAGES" |
        "EMBED_LINKS" |
        "ATTACH_FILES" |
        "READ_MESSAGE_HISTORY" |
        "MENTION_EVERYONE" |
        "USE_EXTERNAL_EMOJIS" |
        "CONNECT" |
        "SPEAK" |
        "MUTE_MEMBERS" |
        "DEAFEN_MEMBERS" |
        "MOVE_MEMBERS" |
        "USE_VAD" |
        "CHANGE_NICKNAME" |
        "MANAGE_NICKNAMES" |
        "MANAGE_ROLES" |
        "MANAGE_WEBHOOKS" |
        "MANAGE_EMOJIS"
    
}
