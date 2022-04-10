module.exports = {
    category: 'Miscellaneous',
    description: 'Ping someone 5 times',

    slash: false,
    testOnly: true,
    callback: ({ channel, args, message }) => {
        console.log(args);
        var target = args[0].match(/\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d/g)||[];
        if(target.length != 0){
            for(i = 0; i < 5; i++){
                channel.send(`<@${target[0]}>`);
            }
            message.delete();
        }else{
            channel.send('What?');
        }
    }
}