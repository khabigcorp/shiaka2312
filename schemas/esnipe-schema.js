const mongoose = require('mongoose');

const emessageSchema = new mongoose.Schema({
    channelID: {
        type: String,
        required: true,
    },
    authorTag: {
        type: String,
        required: true,
    },
    authorPFP: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    messageURL: {
        type: String,
        required: false,
    },
    timestamp: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('esnipedMessages', emessageSchema)