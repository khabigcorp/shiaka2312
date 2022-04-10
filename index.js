const DiscordJS = require('discord.js');
const { Intents } = require('discord.js');
const dotenv = require('dotenv');
const WOKCommands = require('wokcommands');
const path = require('path');
const fs = require('fs');
dotenv.config();

const dataHandlers = new DiscordJS.Collection();
//commands in their own files
const commandFiles = fs.readdirSync('./datahandlers/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./datahandlers/${file}`);
    dataHandlers.set(command.name, command);  
}

const client = new DiscordJS.Client({
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', async() => {
    console.log("Shiaka is online");

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        testServers: ['783861210781057024', '543415871914377227', '956709759728386118'],
        typeScript: false,
        mongoUri: process.env.MONGO_URI,
        dbOptions: { keepAlive: true },
        botOwners: ['433599639682547723', '759758877029564427']
    }).setDefaultPrefix('=');
})

client.on('messageCreate', (message) =>{
    const messageCreated = message;
    dataHandlers.get('swearHandler').execute(messageCreated);
})
client.on('messageDelete', (messageDelete) =>{
    const deletedMessage = messageDelete;
    dataHandlers.get('deleteHandler').execute(deletedMessage);
})
client.on('messageUpdate', (messageUpdate) =>{
    const updatedMessage = messageUpdate;
    dataHandlers.get('updateHandler').execute(updatedMessage);
})

client.login(process.env.TOKEN);