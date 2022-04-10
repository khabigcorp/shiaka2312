const { MessageEmbed } = require('discord.js');
var streakList = [];
var pos = 0;
module.exports =  {
    category: 'Miscellaneous',
    description: 'Flips a coin',

    slash: 'both',
    testOnly: true,
    callback: ({ channel, member, user, interaction }) => {
        console.log(user);
        //finding user in array of people who hava flipped coins
        var streakmessage;
        var dupe = false;
        var flipData = {
            id: 0,
            hs: 0,
            ts: 0
        };
        if(streakList.length != 0){
            for(i = 0; i < streakList.length; i++){
                if(streakList[i].id == member.id){
                    pos = i;
                    dupe = true;
                    i = streakList.length;
                }
            }
            if(!dupe){
                pos = streakList.length;
                streakList[pos] = flipData;
                streakList[pos].id = member.id;
            }

        }else if(streakList.length == 0){
            streakList[0] = flipData;
            streakList[0].id = member.id;
        }

        console.log('position: ' + pos);
        console.log('streaklist: ' + streakList.length);
        var newEmbed = new MessageEmbed()
        //changing streak depending on outcome
        var headsOrTails = Math.floor(Math.random()*1000000) % 2;
        if(headsOrTails == 1){
            streakList[pos].ts = 0;
            streakList[pos].hs = streakList[pos].hs + 1;
            streakmessage = "You have rolled heads " + streakList[pos].hs + " time(s) in a row";
            console.log('headstreak');
            
            newEmbed
            .setAuthor(member.username + '#' + member.discriminator, user.avatarURL('png', true, 16))
            .setColor('#66fdad')
            .setTitle('Heads')
            .setThumbnail('https://i.ibb.co/60JJxDf/heads-removebg-preview.png')
            .setFooter(streakmessage);
            console.log('heads');
        }
        
        else if(headsOrTails == 0){
            streakList[pos].ts = streakList[pos].ts + 1;
            streakList[pos].hs = 0;
            streakmessage = "You have rolled tails " + streakList[pos].ts + " time(s) in a row";
            console.log('tailstreak');

            newEmbed
            .setAuthor(member.user.username + '#' + member.user.discriminator, user.avatarURL('png', true, 16))
            .setColor('#66fdad')
            .setTitle('Tails')
            .setThumbnail('https://i.ibb.co/dcyQdMc/tails-removebg-preview.png')
            .setFooter(streakmessage);
            console.log('tails');
        }
        if(interaction != undefined){
            interaction.reply({content: 'Coin flipped', embeds: [newEmbed]});
        }else{
            channel.send({ content: 'Coin flipped', embeds: [newEmbed] })
        }
        console.log('coin flipped');
    }
} 