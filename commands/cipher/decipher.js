const usedCharactersArray = ['-', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','.',',','?','!',' ','\'','\"','1','2','3','4','5','6','7','8','9','0','/', ':', ';', '=', '+', '{', '}', '[', ']', '|', '\\', '<', '>', '~', '#', '$', '%', '^', '&', '*', '(', ')', '\n'];
const letterArray = ['-', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const { MessageEmbed } = require('discord.js');

var operatorArray = ['','','',''];
var firstNumber;
var secondNumber;
function operandToNumber(operand){
    operator = '';
    if(operand == operatorArray[0]){
        operator = '+';
    }else if(operand == operatorArray[1]){
        operator = '-';
    }else if(operand == operatorArray[2]){
        operator = '*';
    }else if(operand == operatorArray[3]){
        operator = '%';
    }
    return operator;
}
function letterToNumber(letter){
    for(nd = 0; nd < letterArray.length; nd++){
        if(usedCharactersArray[nd] == letter){
            return nd;
        }
    }
}

function unshiftBlock(block, blockNumber, firstNumber, secondNumber){
    secondNumberCopy = `${secondNumber}${blockNumber}`;
    shiftValue = (firstNumber * secondNumberCopy) % letterArray.length;
    newBlock = '';
    for(blkchr = 0; blkchr < block.length; blkchr++){
        newBlock += letterArray[(letterToNumber(block[blkchr])+2*letterArray.length-shiftValue) % letterArray.length];
    }

    return newBlock;
}
module.exports = {
    category: 'Decipher',
    description: 'Deciphers text (that has been ciphered by akashi)',
    expectedArgs: '<text>',
    minArgs: 0,
    slash: 'both',
    testOnly: true,
    callback: ({ interaction, args, message }) => {
        decipheredText = '';
        if(interaction != null){
            if(args[0] == "=cipher") return "I can't cipher nothing";
            var ciphertext = args[0].replace('=decipher ', '');
        }else{
            if(message.content == "=cipher") return "I can't cipher nothing";
            var ciphertext = message.content.replace('=decipher ', '');
        }
        if(ciphertext == ''){
            return "I can't decipher nothing";
        }else if((ciphertext.length-4)%5 != 0){
            console.log(`Cipher text is ${ciphertext.length} long`)
            return "Something's not right with the thing you sent (format issue)";
        }
        firstNumber = `${letterToNumber(ciphertext[0])}${letterToNumber(ciphertext[1])}${letterToNumber(ciphertext[2])}`;
        secondNumber = `${letterToNumber(ciphertext[3])}`;
        console.log(`firstNumber (recovered): ${firstNumber}`);
        console.log(`secondNumber (recovered): ${secondNumber}`);
        operatorArray[0] = ciphertext[0];
        operatorArray[1] = ciphertext[1];
        operatorArray[2] = ciphertext[2];
        operatorArray[3] = ciphertext[3];
        ciphertext = ciphertext.substring(4);
        console.log(`operatorArray (recovered) : ${operatorArray}`);
        var blockArray = ciphertext.match(/.{1,5}/g);
        for(blkn = 0; blkn < blockArray.length; blkn++){
            blockArray[blkn] = unshiftBlock(blockArray[blkn], blkn, firstNumber, secondNumber);
        }
        console.log("recovered text: " + blockArray);
        for(i = 0; i < blockArray.length; i++){
            try{
                evalString = '';
                evalString += letterToNumber(blockArray[i][0]) + operandToNumber(blockArray[i][1]) + letterToNumber(blockArray[i][2]);
                prefixAnswer = eval(evalString).toString() + operandToNumber(blockArray[i][3]) + letterToNumber(blockArray[i][4]);
                decipheredCharacter = (usedCharactersArray[eval(prefixAnswer)]);
                decipheredText += decipheredCharacter;
            }catch(e){
                return "Something's not right with the thing you sent (eval issue)";
            }
        }
        if(decipheredText.length >= 900){
            return "Deciphered text is too long";
        }
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Deciphered Text')
        .setDescription(decipheredText)
        .setImage('https://cdn.discordapp.com/attachments/783861211233124352/996313057116561448/reversematrix.gif')
        .setTimestamp()

        return (exampleEmbed);
    }
}