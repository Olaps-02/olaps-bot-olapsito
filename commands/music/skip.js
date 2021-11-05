const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher, VoiceChannel } = require('discord.js');
const { UserNotInVoiceChannel } = require('../../strings.json');
const ytdl = require('ytdl-core');

module.exports = class SkipCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: "Saute la musique qui passe.",
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} term
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }


        if (!server.queue[0]) {
            server.currentVideo = {url: "", title: "Aucune lecture."};
            return message.say("Il n'y a rien dans la file d'attente");
        }

        server.currentVideo = server.queue[0];
        server.dispatcher = server.connection.play(ytdl(server.currentVideo.url,  { fiter: 'audioonly' }));
        server.queue.shift();

        return message.say(":fast_forward: Skippé avec succès. :thumbsup:");
    }
}