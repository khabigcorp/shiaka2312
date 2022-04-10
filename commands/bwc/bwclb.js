const { MessageActionRow, MessageButton, MessageEmbed, Message } = require('discord.js');
const swearSchema = require('../../schemas/swear-schema.js');
module.exports =  {
    category: 'BWC',
    description: 'Who has sworn the most?',

    slash: 'both',
    testOnly: true,
    callback: ({ channel, interaction, member }) => {
        var pageNumber = 0;
        const messageActions = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('previouspage')
                .setLabel('Previous page')
                .setStyle('PRIMARY')
                .setDisabled(true)
            )
            .addComponents(
                new MessageButton()
                .setCustomId('nextpage')
                .setLabel('Next page')
                .setStyle('PRIMARY')
            )
        function counterLogic(buttonRow, numberOfPages, currentPage){
            if(currentPage == numberOfPages-1){buttonRow.components[1].setDisabled(true);}
            else{ buttonRow.components[1].setDisabled(false);}
            if(currentPage == 0){buttonRow.components[0].setDisabled(true);}
            else{buttonRow.components[0].setDisabled(false);}
        }
        async function categoryListing(){
            let pageArray = [];
            pageArray[0] = '';
            const result = await swearSchema.find();
            console.log(result);
            let counter = 0;
            let counter2 = 0;
            return new Promise((resolve, reject) => {
                if(result.length == 0){
                    reject('There is no leaderboard to leaderboard');
                }
                const sortedArray = result.sort((a,b) => {
                    return b.total - a.total;
                })
                result.forEach((item)=> {
                    console.log(item);
                    pageArray[counter] += `${item.authorTag} has sworn ${item.total} times\n`
                    counter2++;
                    if(counter2 == 10){
                        counter++;
                        counter2 == 0;
                        pageArray[counter] = '';
                    }
                });
                resolve(pageArray)
            }); 
        }
        categoryListing().then((pageArray) => {
            const newEmbed = new MessageEmbed().setDescription(pageArray[pageNumber]).setColor('#66fdad').setTitle(`Swear Count Leaderboards`);
            counterLogic(messageActions, pageArray.length, pageNumber);
            channel.send({
                content: "_ _",
                components: [messageActions],
                embeds: [newEmbed],
            }).then(sent => {
                setTimeout(() => {
                    sent.edit({content: 'This message is now inactive'})
                }, 15000)
                const filter = (btnInt) => {
                    return member.user.id === btnInt.user.id;
                }
                const collector = sent.createMessageComponentCollector({
                    filter,
                    time: 1000*15,
                    max: 20,
                });
                collector.on('collect', async i => {
                    if (i.customId === 'previouspage'){
                        if(pageNumber > 0){
                            pageNumber--;
                        }
                    }else if(i.customId === 'nextpage'){
                        if(pageNumber < pageArray.length - 1){
                            pageNumber++;
                        }
                    }
                    const pageChangeEmbed = new MessageEmbed().setDescription(pageArray[pageNumber]).setColor('#66fdad');
                    counterLogic(messageActions, pageArray.length, pageNumber);
                    i.update({components: [messageActions], embeds: [pageChangeEmbed] });
                })
                collector.on('end', (collected, reason) =>{
                    console.log(reason);
                });
            });
            
        }).catch((err) => {
            console.log(err);
            console.log('An error has occured');
        })
    },
} 