const { Discord, MessageEmbed } = require("discord.js");
const swearSchema = require('../../schemas/swear-schema.js');

async function getData(uid){
    const result = await swearSchema.find({UID: String(uid)});
    return new Promise((resolve, reject) => {
        if(result != undefined) resolve(result);
        reject('lol rejected');
    });
}

module.exports =  {
    category: 'BWC',
    description: 'how many bad words did this person say',

    slash: 'both',
    expectedArgs: '<userID>',
    minArgs: 0,
    maxArgs: 1,
    syntaxError: 'Incorrect usage"',
    testOnly: true,
    callback: ({ channel, args, member, interaction, message }) => {
        const commandMessage = message;
        let { id } = member;
        if(args[0] != undefined && (args[0].match(/\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d/g)||[]).length != 0) id = args[0].match(/\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d/g)[0];
        let returntext = "_ _";
        let returnEmbed = new MessageEmbed();
        getData(id).then((results) => {
            if(results.length > 0){
                const { authorTag, fck, sht, ass, otn, cck, dck, cum, nga, ngr, bch, psy, sex, total } = results[0];
                if(total == 0){
                    returnEmbed
                    .setColor('#66fdad')
                    .setTitle('Swears')
                    .setDescription(`${authorTag} has not sworn (while i was watching)`)
                    .setFooter({text: `Total of: ${total}`})
                    .setImage('https://cdn.discordapp.com/emojis/833931687414726697.png');
                    if(interaction != undefined) { interaction.reply({embeds: [newEmbed]}); }
                    else{ channel.send({embeds: [newEmbed]})};
                }
                else{
                    returnEmbed
                    .setColor('#66fdad')
                    .setTitle(`${authorTag} has sworn. <:sad:834984210837930034>`)
                    .setFooter({text: `Total of: ${total}`})
                    .addFields(
                        {name: 'Fuck', value: String(fck), inline: true,},
                        {name: 'Shit', value: String(sht), inline: true,},
                        {name: 'Ass', value: String(ass), inline: true,},
                        {name: 'Otin', value: String(otn), inline: true,},
                        {name: 'Cock', value: String(cck), inline: true,},
                        {name: 'Dick', value: String(dck), inline: true,},
                        {name: 'Cum', value: String(cum), inline: true,},
                        {name: 'Nworda', value: String(nga), inline: true,},
                        {name: 'Nwordr', value: String(ngr), inline: true,},
                        {name: 'Bitch', value: String(bch), inline: true,},
                        {name: 'Pussy', value: String(psy), inline: true,},
                        {name: 'Sex', value: String(sex), inline: true,},
                    );
                }
            }else{
                returntext = "User not found";
            }

            const comparisonEmbed = new MessageEmbed();
            if(!returnEmbed.equals(comparisonEmbed)){
                if(interaction != undefined){interaction.reply({content: returntext, embeds: ([returnEmbed])});}  
                else { commandMessage.reply({content: returntext, embeds: ([returnEmbed])});}
            }else{
                if(interaction != undefined){interaction.reply({content: returntext});} 
                else {commandMessage.reply({content: returntext});}
            }
        });
    }
}