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

    // FrozenClient class it extends the Discord.js Client
    export class FrozenClient extends Client {
        public constructor(clientOptions: ClientOptionsObject);

        public readonly clientOptions;
        public readonly prefix: string;
        public readonly withTyping: boolean;
        public readonly readyMessage: string;
        public readonly ownerId: string;
        public readonly game: GameObject;

        public readonly commands: Map<string, Command>;
        public readonly aliases: Map<string, Command>;
        public readonly inhibitors: Map<string, Inhibitor>;

        public login(token: string): Promise<string>;
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

    // Inhibitor class
    export class Inhibitor {
        public constructor(client: FrozenClient);

        public readonly client: FrozenClient;
        public readonly name: string;
        public readonly description: string;

        run(message: Message, command: Command): Promise<void> | void;
    }

    // Command class
    export class Command {
        public constructor(client: FrozenClient);

        public readonly category;
        public readonly client: FrozenClient;
        public readonly arguments: Arguments;
        public name: string;
        public description: string;
        public aliases: Array<string>;
        public args: Array<ArgsObject>;
        public botPerms: Array<Permissions>;
        public userPerms: Array<Permissions>;
        public ownerOnly: boolean;
        public guildOnly: boolean;
        public disabled: boolean;

        run(message: Message, args: Array<any>): Promise<Message | Array<Message> | void>;
    }

    // PaginatedMenu class
    export class PaginatedMenu {
        public constructor(message: Message);

        public readonly message: Message;
        public readonly reactor: User;
        public readonly enabled: boolean;
        public readonly current: number;
        public readonly pages: Array<PageObject>;

        addPage(title: string, description: string): number;
        addPages(pages: Array<PageObject>): void;
        setTitle(title: string): void;
        setColor(color: number): void;
        setDescription(description: string): void;
        start(): void;
    }

    export class Arguments {
        public constructor(client: FrozenClient);

        public readonly client: Client;
        public readonly total: Array<ArgsObject>;
        public readonly required: Array<ArgsObject>;
        public readonly checked: Array<string | User>;
        public readonly msgArgs: Array<string>;
        public readonly message: Message;

        cleanUp(): void;
        check(message: Message, command: Command, args: Array<string>, success: () => void, failed: () => void): Promise<void> | void;
        returnArgument(argument: ArgsObject, pos: number): Promise<string | User>;
        run(command: Command): void;
        get args(): Array<string | User>;
    }

    // JSON Object types
    type ClientOptionsObject = {
        prefix?: string,
        withTyping?: boolean
        ownerId?: string,
        readyMessage?: (client: FrozenClient) => string,
        game?: GameObject
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
