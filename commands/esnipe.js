const Discord = require('discord.js');
const messageSchema = require('../schemas/esnipe-schema');

function checkEnding(originalText, endings){
    for(const ending of endings){
        if(originalText.endsWith(`${ending}`)) return true;
    }
    return false;
}
async function getData(channelID){
    const result = await messageSchema.find({channelID: String(channelID)});
    return new Promise((resolve, reject) => {
        if(result != undefined) resolve(result);
        reject('lol rejected');
    });
}
module.exports = {
    category: 'Sniping',
    description: 'a command for sniping',

    slash: 'both',
    testOnly: true,
    callback: ({ channel, args, interaction, message }) => {
        const commandMessage = message;
        const videoEndingArray = ['mp4', 'mov', 'avi', 'flv', 'mkv', 'wmv', 'webm'];
        const imageEndingArray = ['jpeg', 'gif', 'png', 'webp', 'jfif'];
        let returntext = "_ _";
        let stop = false;
        getData(channel.id).then((results)=>{
            var snipeEmbed = new Discord.MessageEmbed();
            if(results.length == 0) { returntext =  "There is nothing to snipe";  stop = true}
            if(args[0] >= results.length) { returntext = "You may be looking too far back into the past"; stop = true}
            if(!stop){
                const trace = results.length - (args[0] || 0) - 1;
                const {authorTag, authorPFP, message, messageURL, timestamp} = results[trace]
                const video = checkEnding(messageURL, videoEndingArray);
                const image = checkEnding(messageURL, imageEndingArray);
                const footer =  `Sent at ${timestamp}`;
                if(image){
                    snipeEmbed
                    .setColor('#66fdad')
                    .setThumbnail(authorPFP)
                    .setAuthor((authorTag, '', authorPFP))
                    .setDescription((message || '_ _'))
                    .setImage(`${messageURL}`)
                    .setFooter({text: footer});
                }else if(video){
                    returntext = `${authorTag} (${footer}): \n ${message} \n ${messageURL}`
                }else{
                    snipeEmbed
                    .setColor('#66fdad')
                    .setThumbnail(authorPFP)
                    .setAuthor({name: authorTag, iconURL: authorPFP})
                    .setDescription((message || '_ _'))
                    .setFooter({text: footer});
                }
            }
            const comparisonEmbed = new Discord.MessageEmbed();
            if(!snipeEmbed.equals(comparisonEmbed)){
                if(interaction != undefined){interaction.reply({content: returntext, embeds: ([snipeEmbed])});}  
                else { commandMessage.reply({content: returntext, embeds: ([snipeEmbed])});}
            }else{
                if(interaction != undefined){interaction.reply({content: returntext});} 
                else {commandMessage.reply({content: returntext});}
            }
        })
    },
}