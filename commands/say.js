module.exports =  {
    category: 'Testing',
    description: 'Replies with pong',

    slash: false,
    testOnly: true,
    callback: ({ message, channel }) => {
        console.log('say has fired');
        if(message == undefined) channel.send('What');
        const args = message.content.split(/ +/);
        var sayText = message.content.replace('=say ', '').replace('`', '');
        if(args[1] == undefined){ 
            message.channel.send('You didn\'t type anything');
            return;  
        }
        if(args[1].search(/\<#\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\>/) != -1){
            var sayChannel = args[1].replace('<#', '').replace('>', '');
            console.log(args[1])
            sayText = sayText.replace(/\<#\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\>/, '');
            console.log(sayText);
            try{ client.channels.cache.get(sayChannel).send(sayText); }
            catch{ message.channel.send('Channel not found'); }
        }else if(sayText != ''){
            message.channel.send(sayText);
        }
        console.log(message)
        message.delete()
        .then(msg => console.log(`Deleted message from ${msg.author.username}`))
        .catch(console.error);
    },
} 