declare module "frozencord" {

    import {
        Client,
        ClientUserGuildSettings,
        Message,
        User,
        Channel,
        Emoji,
        Guild,
        GuildMember,
        Collection,
        Snowflake,
        MessageReaction,
        Role
    } from "discord.js";

    export class FrozenClient extends Client {
        public constructor(clientOptions: ClientOptionsObject);

        public prefix: string;
        public withTyping: boolean;
        public readyMessage: string;
        public ownerId: string;
        public game: GameObject;

        public commands: Map<string, Command>;
        public aliases: Map<string, Command>;
        public inhibitors: Map<string, Inhibitor>;

        public login(token): void;
        public unloadCommand(command: Command): void;

        // D.JS events
        public on(event: string, listener: Function): this;
        public on(event: "raw", listener: (payload: Object) => void): this;
        public on(event: "channelCreate" | "channelDelete", listener: (channel: Channel) => void): this;
        public on(event: "channelPinsUpdate", listener: (channel: Channel, time: Date) => void): this;
        public on(event: "channelUpdate", listener: (oldChannel: Channel, newChannel: Channel) => void): this;
        public on(event: "clientUserGuildSettingsUpdate", listener: (clientUserGuildSettings: ClientUserGuildSettings) => void): this;
        public on(event: "debug", listener: (info: string) => void): this;
        public on(event: "disconnect", listener: (event: CloseEvent) => void): this;
        public on(event: "emojiCreate" | "emojiDelete", listener: (emoji: Emoji) => void): this;
        public on(event: "emojiUpdate", listener: (oldEmoji: Emoji, newEmoji: Emoji) => void): this;
        public on(event: "error", listener: (error: Error) => void): this;
        public on(event: "guildBanAdd" | "guildBanRemove", listener: (guild: Guild, user: User) => void): this;
        public on(event: "guildCreate" | "guildDelete" | "guildUnivalible", listner: (guild: Guild) => void): this;
        public on(event: "guildMemberAdd" | "guildMemberAvalible" | "guildMemberRemove", listener: (member: GuildMember) => void): this;
        public on(event: "guildMembersChunk", listner: (members: Array<GuildMember>, guild: Guild) => void): this;
        public on(event: "guildMemberSpeaking", listener: (member: GuildMember, speaking: boolean) => void): this;
        public on(event: "guildUpdate", listener: (oldGuild: Guild, newGuild: Guild) => void): this;
        public on(event: "message" | "messageDelete", listener: (message: Message) => void): this;
        public on(event: "messageBulkDelete", listener: (messsages: Collection<Snowflake, Message>) => void): this;
        public on(event: "messageReactionAdd" | "messageReactionRemove", listener: (messageReaction: MessageReaction, user: User) => void): this;
        public on(event: "messageReactionRemoveAll", listener: (message: Message) => void): this;
        public on(event: "messageUpdate", listener: (oldMessage: Message, newMessage: Message) => void): this;
        public on(event: "presenceUpdate", listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
        public on(event: "ready", listener: () => void): this;
        public on(event: "reconnecting", listener: () => void): this;
        public on(event: "resume", listener: (replayed: number) => void): this;
        public on(event: "roleCreate" | "roleDelete", listener: (role: Role) => void): this;
        public on(event: "roleUpdate", listener: (oldRole: Role, newRole: Role) => void): this;
        public on(event: "typingStart" | "typingStop", listener: (channel: Channel, user: User) => void): this;
        public on(event: "userNoteUpdate", listener: (user: User, oldNote: string, newNote: string) => void): this;
        public on(event: "userUpdate", listener: (oldUser: User, newUser: User) => void): this;
        public on(event: "voiceStateUpdate", listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
        public on(event: "warn", listener: (info: string) => void): this;

        // D.JS events
        public once(event: string, listener: Function): this;
        public once(event: "raw", listener: (payload: Object) => void): this;
        public once(event: "channelCreate" | "channelDelete", listener: (channel: Channel) => void): this;
        public once(event: "channelPinsUpdate", listener: (channel: Channel, time: Date) => void): this;
        public once(event: "channelUpdate", listener: (oldChannel: Channel, newChannel: Channel) => void): this;
        public once(event: "clientUserGuildSettingsUpdate", listener: (clientUserGuildSettings: ClientUserGuildSettings) => void): this;
        public once(event: "debug", listener: (info: string) => void): this;
        public once(event: "disconnect", listener: (event: CloseEvent) => void): this;
        public once(event: "emojiCreate" | "emojiDelete", listener: (emoji: Emoji) => void): this;
        public once(event: "emojiUpdate", listener: (oldEmoji: Emoji, newEmoji: Emoji) => void): this;
        public once(event: "error", listener: (error: Error) => void): this;
        public once(event: "guildBanAdd" | "guildBanRemove", listener: (guild: Guild, user: User) => void): this;
        public once(event: "guildCreate" | "guildDelete" | "guildUnivalible", listner: (guild: Guild) => void): this;
        public once(event: "guildMemberAdd" | "guildMemberAvalible" | "guildMemberRemove", listener: (member: GuildMember) => void): this;
        public once(event: "guildMembersChunk", listner: (members: Array<GuildMember>, guild: Guild) => void): this;
        public once(event: "guildMemberSpeaking", listener: (member: GuildMember, speaking: boolean) => void): this;
        public once(event: "guildUpdate", listener: (oldGuild: Guild, newGuild: Guild) => void): this;
        public once(event: "message" | "messageDelete", listener: (message: Message) => void): this;
        public once(event: "messageBulkDelete", listener: (messsages: Collection<Snowflake, Message>) => void): this;
        public once(event: "messageReactionAdd" | "messageReactionRemove", listener: (messageReaction: MessageReaction, user: User) => void): this;
        public once(event: "messageReactionRemoveAll", listener: (message: Message) => void): this;
        public once(event: "messageUpdate", listener: (oldMessage: Message, newMessage: Message) => void): this;
        public once(event: "presenceUpdate", listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
        public once(event: "ready", listener: () => void): this;
        public once(event: "reconnecting", listener: () => void): this;
        public once(event: "resume", listener: (replayed: number) => void): this;
        public once(event: "roleCreate" | "roleDelete", listener: (role: Role) => void): this;
        public once(event: "roleUpdate", listener: (oldRole: Role, newRole: Role) => void): this;
        public once(event: "typingStart" | "typingStop", listener: (channel: Channel, user: User) => void): this;
        public once(event: "userNoteUpdate", listener: (user: User, oldNote: string, newNote: string) => void): this;
        public once(event: "userUpdate", listener: (oldUser: User, newUser: User) => void): this;
        public once(event: "voiceStateUpdate", listener: (oldMember: GuildMember, newMember: GuildMember) => void): this;
        public once(event: "warn", listener: (info: string) => void): this;
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

    export class PaginatedMenu {
        public constructor(message: Message);

        public message: Message;
        public reactor: User;
        public enabled: boolean;
        public current: number;
        public pages: Array<PageObject>;

        public addPage(title: string, description: string): number;
        public addPages(...pages: Array<PageObject>): void;
        public setTitle(title: string): void;
        public setColor(color: number): void;
        public setDescription(description: string): void;
        public start(): void;

    }

    // JSON Object types
    type ClientOptionsObject = {
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

    type PageObject = {
        title: string,
        description: string
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
