const messageSchema = require('../schemas/esnipe-schema');

function createTimestamp(timestamp, addZero){
    var zero = addZero?"0":"";
    var returnTime = `${timestamp.getHours()}:${zero}${timestamp.getMinutes()} ${timestamp.getMonth()+1}/${timestamp.getDate()}/${timestamp.getFullYear()}`;
    return returnTime;
}
module.exports = {
    name: "updateHandler",
    description: "Places deleted messages in the database",
    execute(updatedMessage){
        const testing = false;
        //some return conditions
        console.log('pre reutn block')
        if(typeof updatedMessage == undefined) return;
        if(updatedMessage.author.bot) return;
        console.log('post rerturn blocks')
        //logging
        console.log(updatedMessage);
        //the clean code for delicious cleanness mmmm
        const {channelId, content, createdAt} = updatedMessage;
        const {username, discriminator} = updatedMessage.author
        const displayAvatarURL = updatedMessage.author.displayAvatarURL('jpg',96);
        const tag = `${username}#${discriminator}`
        //the attachment url, if there is any.
        let url = '';
        if(typeof updatedMessage.attachments != undefined){
            const { attachments } = updatedMessage;
            attachments.forEach((attachment) => {
                url = attachment.proxyURL;
            })
        } 
        //the embed url, if there is any.
        if(updatedMessage.embeds[0] != undefined) url = updatedMessage.embeds[0].url;
        //the timestamp
        const timestamp = createTimestamp(createdAt, createdAt.getMinutes > 0)
        if(testing){
            console.log(channelId);
            console.log(tag);
            console.log(avatar);
            console.log(content);
            console.log(url);
            console.log(timestamp);
        }
        
        //inserting the values in the mongdb database
        setTimeout(async() => {
            console.log('esnipe test');
            const updatedMessageObject = {
                channelID: channelId,
                authorTag: tag,
                authorPFP: displayAvatarURL,
                message: content,
                messageURL: url,
                timestamp: timestamp,
            }
            await new messageSchema(updatedMessageObject).save()
        }, 100);
    }
}