module.exports = {
    category: 'Testing',
    description: 'a ping',

    slash: 'both',
    testOnly: true,
    callback: ({ message, interaction }) => {
        const replyMessage = "Alive";
        return replyMessage;
    },
}