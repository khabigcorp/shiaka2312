const swearSchema = require('../schemas/swear-schema');

function checkSwear(content, theSwear){
    swear = `${theSwear}`
    if(content.match(RegExp(`${theSwear}`, ['g'])) == null){ return false; }
    if(content.match(RegExp(`${theSwear}`, ['g'])).length == 0){ return false; }
    else{ return true; }
}

async function checkUser(authorid){
    const result = await swearSchema.find({UID: String(authorid)});
    var returnValue = false;
    if(result.length > 0) returnValue = true;
    return new Promise((resolve, reject) => {
        if(result != undefined) resolve(returnValue);
        reject('lol rejected');
    });
}

async function addValues(incrementArray, swearTotal, tag, id){
    const swearWordsObject = {
        UID: id,
        authorTag: tag,
        fck: incrementArray[0],
        sht: incrementArray[1],
        ass: incrementArray[2],
        otn: incrementArray[3],
        cck: incrementArray[4],
        dck: incrementArray[5],
        cum: incrementArray[6],
        nga: incrementArray[7],
        ngr: incrementArray[8],
        bch: incrementArray[9],
        psy: incrementArray[10],
        sex: incrementArray[11],
        total: swearTotal,
    }
    await new swearSchema(swearWordsObject).save()
}

async function updateValues(incrementArray, swearTotal, userID){
    await swearSchema.updateOne({
        "UID": userID,
    }, {
        $inc: {
            "fck": incrementArray[0],
            "sht": incrementArray[1],
            "ass": incrementArray[2],
            "otn": incrementArray[3],
            "cck": incrementArray[4],
            "dck": incrementArray[5],
            "cum": incrementArray[6],
            "nga": incrementArray[7],
            "ngr": incrementArray[8],
            "bch": incrementArray[9],
            "psy": incrementArray[10],
            "sex": incrementArray[11],
            "total": swearTotal,
        }
    });
}

module.exports = {
    name: "swearHandler",
    description: "takes your swears and puts them in the database",
    execute(message){
        //getting the relevant data
        const { content } = message;
        const { tag, id } = message.author;
        //change username of person
        setTimeout(async()=>{
            await swearSchema.updateOne({
                "UID": id,
            }, {
            $set: { "authorTag": message.author.tag,}
            })
        }, 10);
        if(message.author.bot) return;
        //swear logic
        let swearIncrease = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        if(checkSwear(content,'fuck'))swearIncrease[0] = content.match(/fuck/g).length;
        if(checkSwear(content,'shit'))swearIncrease[1] = content.match(/shit/g).length-(content.match(/ushit/g)|| []).length-(content.match(/shittake/g)|| []).length;
        if(checkSwear(content,'ass'))swearIncrease[2] = (content.match(/ass/g) || []).length-(content.match(/asse/g) || []).length-(content.match(/assi/g) || []).length-(content.match(/pass/g)|| []).length-(content.match(/bass/g)|| []).length-(content.match(/assault/g)|| []).length-2*(content.match(/assassin/g)|| []).length-(content.match(/rass/g)|| []).length-(content.match(/assortment/g)|| []).length-(content.match(/assu/g)|| []).length-(content.match(/lass/g)|| []).length-(content.match(/hass/g)|| []).length-(content.match(/mass/g)|| []).length+( (content.match(/passe/g)|| []).length+(content.match(/passi/g)|| []).length+(content.match(/masse/g)|| []).length+(content.match(/massi/g)|| []).length+(content.match(/rasse/g)|| []).length+(content.match(/rassi/g)|| []).length+(content.match(/lasse/g)|| []).length+(content.match(/lassi/g)|| []).length )+(content.match(/assassi/g) || []).length;
        if(checkSwear(content,'otin'))swearIncrease[3] = (content.match(/otin/g).length-(content.match(/ootin/g)|| []).length-(content.match(/otine/g)|| []).length-(content.match(/oting/g)|| []).length-(content.match(/otino/g)|| []).length);;
        if(checkSwear(content,'cock'))swearIncrease[4] = content.match(/cock/g).length - (content.match(/cockroach/g)|| []).length;
        if(checkSwear(content,'dick'))swearIncrease[5] = content.match(/dick/g).length;
        if(checkSwear(content,'cum'))swearIncrease[6] = (content.match(/cum/g).length-(content.match(/cum laude/g)|| []).length-(content.match(/circum/g)|| []).length-(content.match(/accum/g)|| []).length-(content.match(/docum/g)|| []).length-(content.match(/cumu/g)|| []).length-(content.match(/incum/g)|| []).length-(content.match(/succum/g)|| []).length-(content.match(/scum/g)|| []).length-(content.match(/cucum/g)|| []).length-(content.match(/icum/g)|| []).length-(content.match(/cumin/g)|| []).length);
        if(checkSwear(content,'nigga'))swearIncrease[7] = content.match(/nigga/g).length;
        if(checkSwear(content,'nigger'))swearIncrease[8] = content.match(/nigger/g).length;
        if(checkSwear(content,'bitch'))swearIncrease[9] = content.match(/bitch/g).length;
        if(checkSwear(content,'pussy'))swearIncrease[10] = (content.match(/pussy/g).length-(content.match(/pussy cat/g)|| []).length);
        if(checkSwear(content,'sex'))swearIncrease[11] = (content.match(/sex/g).length-(content.match(/sexy/g)|| []).length-(content.match(/sexu/g)|| []).length);
        for(i = 0; i<13; i++){
            if(swearIncrease[i] < 0) swearIncrease[i] == 0; 
        }
        const total = swearIncrease.reduce((acc,cur) => acc+cur);
        //logic for user inputs
        checkUser(id).then((thereIsUser) => {
            if(thereIsUser){
                //add the swears if the user is in teh database
                setTimeout(async() => {
                    await swearSchema.updateOne({
                        "UID": id,
                    }, {
                        $inc: {
                            "fck": swearIncrease[0],
                            "sht": swearIncrease[1],
                            "ass": swearIncrease[2],
                            "otn": swearIncrease[3],
                            "cck": swearIncrease[4],
                            "dck": swearIncrease[5],
                            "cum": swearIncrease[6],
                            "nga": swearIncrease[7],
                            "ngr": swearIncrease[8],
                            "bch": swearIncrease[9],
                            "psy": swearIncrease[10],
                            "sex": swearIncrease[11],
                            "total": total,
                        }
                    });
                }, 100);
            }else{
                //add user adn their swears if they are not in the database yet
                setTimeout(async() => {
                    const swearWordsObject = {
                        "UID": id,
                        "authorTag": tag,
                        "fck": swearIncrease[0],
                        "sht": swearIncrease[1],
                        "ass": swearIncrease[2],
                        "otn": swearIncrease[3],
                        "cck": swearIncrease[4],
                        "dck": swearIncrease[5],
                        "cum": swearIncrease[6],
                        "nga": swearIncrease[7],
                        "ngr": swearIncrease[8],
                        "bch": swearIncrease[9],
                        "psy": swearIncrease[10],
                        "sex": swearIncrease[11],
                        "total": total,
                    }
                    await new swearSchema(swearWordsObject).save()
                }, 100);
            }
        })

    }
}