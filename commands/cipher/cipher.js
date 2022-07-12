const usedCharactersArray = ['-', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','.',',','?','!',' ','\'','\"','1','2','3','4','5','6','7','8','9','0','/', ':', ';', '=', '+', '{', '}', '[', ']', '|', '\\', '<', '>', '~', '#', '$', '%', '^', '&', '*', '(', ')', '\n'];
const letterArray = ['-', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const { MessageEmbed } = require('discord.js');
//amen sack overflow
var firstNumber = '';
var secondNumber = '';
var operandArray = ['','','',''];
function factors(num) {
    const isEven = num % 2 === 0;
    const max = Math.sqrt(num);
    const inc = isEven ? 1 : 2;
    let factors = [1, num];
  
    for (let curFactor = isEven ? 2 : 3; curFactor <= max; curFactor += inc) {
      if (num % curFactor !== 0) continue;
      factors.push(curFactor);
      let compliment = num / curFactor;
      if (compliment !== curFactor) factors.push(compliment);
    }
  
    return factors;
}
function letterToNumber(letter){
    for(nd = 0; nd < usedCharactersArray.length; nd++){
        if(usedCharactersArray[nd] == letter){
            return nd;
        }
    }
}
//thank you sir stack overflow
function isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}
function sfCombinations(prefixes, suffixes){
    var combinations = [];
    for(p = 0; p < prefixes.length; p++){
        for(j= 0; j < suffixes[p].length; j++){
            combinations.push(prefixes[p] + suffixes[p][j]);
        }
    }
    return combinations;
}
//trying for suffixes
function branchOut(prefix, desiredNumber){
    var possibleSuffixes = [];
    var tempVar = prefix-desiredNumber;
    tempVar = desiredNumber-prefix;
    if(prefix < desiredNumber && tempVar < letterArray.length && tempVar >= 0){
        possibleSuffixes.push(`${operandArray[0]}${letterArray[tempVar]}`);
    }
    if(prefix > desiredNumber && tempVar < letterArray.length && tempVar >= 0){
        possibleSuffixes.push(`${operandArray[1]}${letterArray[tempVar]}`);
    }
    tempVar = desiredNumber/prefix
    if(isInt(tempVar) && tempVar < letterArray.length && tempVar >= 0){
        possibleSuffixes.push(`${operandArray[2]}${letterArray[tempVar]}`);
    }
    factorArray = factors(prefix-desiredNumber);
    for(x = 0; x < factorArray.length; x++){
        if(factorArray[x] > desiredNumber && factorArray[x] < letterArray.length){
            possibleSuffixes.push(`${operandArray[3]}${letterArray[factorArray[x]]}`);
        }
    }
    return possibleSuffixes;
}
function generateBlock(letter){
    const possibleBlockArray = [];
    var flag = true;
    while(flag){
        const num1 = Math.floor(Math.random()*letterArray.length);
        const num2 = Math.floor(Math.random()*letterArray.length);
        suffixArray = [branchOut(num1+num2, letterToNumber(letter), operandArray), branchOut(num1-num2, letterToNumber(letter), operandArray),branchOut(num1*num2, letterToNumber(letter), operandArray),branchOut(num1%num2, letterToNumber(letter), operandArray)];
        prefixArray = [`${letterArray[num1]}${operandArray[0]}${letterArray[num2]}`,`${letterArray[num1]}${operandArray[1]}${letterArray[num2]}`,`${letterArray[num1]}${operandArray[2]}${letterArray[num2]}`,`${letterArray[num1]}${operandArray[3]}${letterArray[num2]}`];
        if(suffixArray[0].length == 0 && suffixArray[0].length == 0 && suffixArray[0].length == 0 &&suffixArray[0].length == 0){
            continue;
        }
        flag = false;
    }
    totalArray = sfCombinations(prefixArray, suffixArray);
    const returnBlock = totalArray[Math.floor(Math.random()*totalArray.length)]
    if(returnBlock == undefined){
        return "Something went wrong"
    }
    return returnBlock;
}

function shiftBlock(block, blockNumber){
    secondNumberCopy = `${secondNumber}${blockNumber}`;
    shiftValue = (firstNumber * secondNumberCopy) % letterArray.length;
    newBlock = "";
    for(blkchr = 0; blkchr < block.length; blkchr++){
        newBlock += letterArray[(letterToNumber(block[blkchr])+shiftValue)%letterArray.length];
    }
    return newBlock;
}
function generateRandomHeader(){
    headerString = '';
    numberString = '';
    //ASTM
    for(opera = 0; opera < 4; opera++){
        tempFlag = true;
        while(tempFlag){
            randGen = Math.floor(Math.random()*letterArray.length);
            genString = letterArray[randGen];
            if(operandArray.includes(genString)) continue;
            operandArray[opera] = genString;
            headerString += genString;
            if(opera != 3) firstNumber += `${randGen}`;
            tempFlag = false;
        }
    }
    secondNumber += `${letterToNumber(headerString[3])}`
    return headerString;
}
module.exports = {
    category: 'Cipher',
    description: 'Ciphers some text with the Akashi cipher, or something',
    slash: 'both',
    expectedArgs: '<text>',
    minArgs: 0,
    testOnly: true,
    callback: ({ message, interaction, args }) => {
        if(interaction != null){
            if(args[0] == "=cipher") return "I can't cipher nothing";
            var toBeCiphered = args[0].replace("=cipher ", '');
        }else{
            if(message.content == "=cipher") return "I can't cipher nothing";
            var toBeCiphered = message.content.replace("=cipher ", '');
        }
        if(toBeCiphered.length >= 400){
            return "Your message is too long";
        }else if(toBeCiphered.length <= 0){
            return "I can't cipher nothing";
        }
        console.log(toBeCiphered);
        var cipherText = "``";
        firstNumber = '';
        secondNumber = '';
        cipherText += generateRandomHeader();
        for(dj = 0; dj < toBeCiphered.length; dj++){
            miniblock = `${generateBlock(toBeCiphered[dj])}`;
            console.log("original text: " + miniblock);
            miniblock = shiftBlock(miniblock, dj);
            cipherText += miniblock;
        }
        console.log(`first number (original): ${firstNumber}`);
        console.log(`second number (original): ${secondNumber}`);
        cipherText +="``"
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Ciphered Text')
        .setDescription(cipherText)
        .setImage('https://cdn.discordapp.com/attachments/783861211233124352/996302582639239208/matrix.gif')
        .setTimestamp()
        if(interaction != null){
            interaction.reply({ content: '_ _', embeds: [exampleEmbed], ephemeral: true });
        }else{
            message.reply({content: '_ _', embeds: [exampleEmbed]})
        }
    }
}