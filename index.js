const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { token } = require('../Discord bot/config.json');

const client = new CommandoClient({
    commandPrefix: '+',
    owner: '905194236054491168',
    invite: 'https://discord.gg/7chJbrHBG9'
});

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerGroup('music', 'Music')
    .registerCommandsIn(path.join(__dirname, 'commands'));

    client.server = {
        queue: [],
        currentVideo: { url: "", title: "Aucune lecture." },
        dispatcher: null,
        connection: null
    };

    client.once('ready', () => {
        console.log(`Connecté en tant que ${client.user.tag} -  (${client.user.id})`);
    });

client.on('error', (error) => console.error(error));

client.login(process.env.TOKEN);