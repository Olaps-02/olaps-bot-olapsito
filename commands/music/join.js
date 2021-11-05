const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher, VoiceChannel } = require('discord.js');
const { UserNotInVoiceChannel } = require('../../strings.json');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Fait rejoindre le bot dans votre salon vocal.',
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} term
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }

        await voiceChannel.join();

        return message.say(":thumbsup: J'ai rejoins " + " ``" + voiceChannel.name + "``");
    }
}