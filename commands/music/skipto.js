const { Command, CommandoMessage } = require("discord.js-commando");
const { StreamDispatcher, VoiceChannel } = require('discord.js');
const { UserNotInVoiceChannel } = require('../../strings.json');
const ytdl = require('ytdl-core');

module.exports = class SkipToCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'skipto',
            group: 'music',
            memberName: 'skipto',
            description: "Passe d'une musique à l'autre.",
            args: [
                {
                    key: 'index',
                    prompt: "A quelle position de la file d'attente veux-tu te rendre?",
                    type: 'integer'
                }
            ]
        });
    }
    /**
     * 
     * @param {CommandoMessage} message 
     * @param {String} term
     */
    async run(message, { index }) {
        const voiceChannel = message.member.voice.channel;
        const server = message.client.server;

        if (!voiceChannel) {
            return message.say(UserNotInVoiceChannel);
        }

        if (!message.client.voice.connections.first()) {
            return message.say(BotNotInVoiceChannel);
        }

        index--;

        if (!server.queue[index]) {
            server.currentVideo = {url: "", title: "Aucune lecture."};
            return message.say("Ce titre n'a pas été trouvé dans la file d'attente");
        }

        server.currentVideo = server.queue[index];

        server.dispatcher = server.connection.play(ytdl(server.currentVideo.url,  { fiter: 'audioonly' }));
        server.queue.splice(index, 1);

        return message.say(":fast_forward: Skippé avec succès. :thumbsup:");
    }
}