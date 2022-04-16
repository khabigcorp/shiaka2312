const messageSchema = require('../schemas/snipe-schema');

function createTimestamp(timestamp, addZero){
    var zero = addZero?"0":"";
    var returnTime = `${timestamp.getHours()}:${zero}${timestamp.getMinutes()} ${timestamp.getMonth()+1}/${timestamp.getDate()}/${timestamp.getFullYear()}`;
    return returnTime;
}
module.exports = {
    name: "deleteHandler",
    description: "Places deleted messages in the database",
    execute(deletedMessage){
        const testing = false;
        //some return conditions
        if(typeof deletedMessage == undefined) return;
        if(deletedMessage.author.bot) return;
        //logging
        console.log(deletedMessage);
        //the clean code for delicious cleanness mmmm
        const {channelId, content, createdAt} = deletedMessage;
        const {username, discriminator} = deletedMessage.author
        const displayAvatarURL = deletedMessage.author.displayAvatarURL('jpg',96);
        const tag = `${username}#${discriminator}`
        //the attachment url, if there is any.
        let url = '';
        if(typeof deletedMessage.attachments != undefined){
            const { attachments } = deletedMessage;
            attachments.forEach((attachment) => {
                url = attachment.proxyURL;
            })
        } 
        //the embed url, if there is any.
        if(deletedMessage.embeds[0] != undefined) url = deletedMessage.embeds[0].url;
        //the timestamp
        const timestamp = createTimestamp(createdAt, createdAt.getMinutes > 9)
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
            const deletedMessageObject = {
                channelID: channelId,
                authorTag: tag,
                authorPFP: displayAvatarURL,
                message: content,
                messageURL: url,
                timestamp: timestamp,
            }
            await new messageSchema(deletedMessageObject).save()
        }, 100);
    }
}