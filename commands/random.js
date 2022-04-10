module.exports = {
    category: 'Miscellaneous',
    description: '25 youtooz links',

    slash: 'both',
    testOnly: true,
    callback: ({channel}) => {
        var bigText = '';
        var loopStart = Date.now();
        for(i = 1; i < 26; i++){
            var sendText = 'https://www.youtube.com/watch?v=';
            var addChar = '';
            for(j = 0; j < 11; j++){
                var characterCode = Math.floor((Math.random()*23912391)) % 64 + 48;
                if(characterCode > 57){
                    characterCode += 7;
                }
                if(characterCode > 90){
                    characterCode += 6;
                }
                if(characterCode == 123){
                    addChar = '-'
                }else if(characterCode == 124){
                    addChar = '_'
                }else{
                    addChar = String.fromCharCode(characterCode);
                }
                sendText += addChar;
            }
            console.log(sendText);
            bigText += sendText + '\n';
            if(i % 5 == 0){
                channel.send(bigText);
                bigText = '';
            }
        }
        var loopEnd = Date.now();
        channel.send(`${loopEnd-loopStart}ms`)
    }
}