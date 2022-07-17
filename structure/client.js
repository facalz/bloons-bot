const { Client } = require('discord.js');

module.exports = class extends Client {
    constructor(config) {
        super({
            intents: 1647,
            disableMentions: 'everyone',
            disabledEvents: [
                'TYPING_START',
                'VOICE_SERVER_UPDATE',
                'RELATIONSHIP_ADD',
                'RELATIONSHIP_REMOVE',
                'GUILD_ROLE_DELETE',
                'GUILD_ROLE_UPDATE',
                'GUILD_BAN_ADD',
                'GUILD_BAN_REMOVE',
                'CHANNEL_UPDATE',
                'CHANNEL_PINS_UPDATE',
                'MESSAGE_DELETE',
                'MESSAGE_DELETE_BULK',
                'MESSAGE_REACTION_ADD',
                'MESSAGE_REACTION_REMOVE',
                'GUILD_MEMBER_UPDATE',
                'GUILD_MEMBERS_CHUNK',
                'GUILD_ROLE_CREATE',
                'MESSAGE_REACTION_REMOVE_ALL',
                'USER_UPDATE',
                'USER_NOTE_UPDATE',
                'USER_SETTINGS_UPDATE',
                'PRESENCE_UPDATE',
                'VOICE_STATE_UPDATE',
                'GUILD_UPDATE',
                'GUILD_MEMBER_ADD',
                'GUILD_MEMBER_REMOVE'
            ],
            messageCreateEditHistoryMaxSize: 1,
            messageCreateSweepInterval: 1,
            messageCreateCacheLifetime: 1,
            messageCreateCacheMaxSize: 1,
            cacheChannels: true,
            restTimeOffset: 0,
        });

        this.config = config;
    }
};