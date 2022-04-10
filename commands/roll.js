module.exports =  {
    category: 'Miscellaneous',
    description: 'roll',

    slash: false,
    expectedArgs: '<range>',
    minArgs: 0,
    testOnly: true,
    callback: ({ channel, args }) => {
        var low = 1;
        var high = 100;
        var rolledNumber;
        var range = args[0]
            if(range != undefined && range.search(/\d+\-\d+/) != -1){
                var numbers = range.split('-');
                low = parseInt(numbers[0]);
                high = parseInt(numbers[1]);
                if(high>1000000000000000){
                    channel.send('Don\'t you think thats a little bit too high');
                    return;
                }
                console.log(low);
                console.log(high);
                rolledNumber = Math.floor(1000000000000000*Math.random())%(high-low+1)+low;
            }else if(range != undefined && range.search(/\d+/) != -1){
                high = parseInt(args[0].match(/\d+/));
                rolledNumber = Math.floor(1000000000000000*Math.random())%(high-low+1)+low;
            }else{
                rolledNumber = Math.floor(1000000000000000*Math.random())%100;
            }
            channel.send(`You rolled **${rolledNumber}**! (from the range ${low}-${high})`);
        return;
    },
} 