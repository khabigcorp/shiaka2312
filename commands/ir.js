const axios = require('axios');

var oembedUrl = 'https://www.youtube.com/oembed?url=http%3A//www.youtube.com/watch%3Fv%3D';
var oembedCnt = '&format=json';
var attemptCount = 0;
var startThing = false;
var continute = true;
var startTime;
var endTime;
function amongsus(start, channel){
    if(!start){
        endTime = Date.now();
        channel.send(`Random checking has stopped at ${attemptCount} attempts, took ${endTime-startTime}ms`);
        attemptCount = 0;
        continute = false;
    }else if(start){
        continute = true;
        if(attemptCount == 0) {
            channel.send(`Random checking has started`);
            startTime = Date.now();
        }
        var url = '';
        var testUrl = 'BgK0DtbwMTc';
        for(j = 0; j < 11; j++){
            var characterCode = Math.floor((Math.random()*10000)) % 64 + 48;
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
            url += addChar;
        }
        axios.get(`${oembedUrl}${url}${oembedCnt}`, {})
        .then((data) => {
            console.log(data);
            channel.send(`HOOOOLLLYYYY SHIIITTT WEE GOOT SOMETHIIIIIIIIING: https://www.youtube.com/watch?v=${url}`);
        })
        .catch((err) => {
            console.log(`The youtube link ${url} does not work.`);
            attemptCount++;
            amongsus(continute, channel);
        })
    }
}


module.exports = {
    category: 'Miscellaneous',
    description: '25 youtooz links',

    slash: false,
    testOnly: true,
    callback: ({channel}) => {
        startThing = !startThing;
        amongsus(startThing, channel);
    }
}