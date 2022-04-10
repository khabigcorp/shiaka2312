const mongoose = require('mongoose');

const swearSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: true,
    },
    authorTag: {
        type: String,
        required: true,
    },
    fck: {
        type: Intl,
        required: true,
    },
    sht: {
        type: Intl,
        required: true,
    },
    ass: {
        type: Intl,
        required: true,
    },
    otn: {
        type: Intl,
        required: true,
    },
    cck: {
        type: Intl,
        required: true,
    },
    dck: {
        type: Intl,
        required: true,
    },
    cum: {
        type: Intl,
        required: true,
    },
    nga: {
        type: Intl,
        required: true,
    },
    ngr: {
        type: Intl,
        required: true,
    },
    bch: {
        type: Intl,
        required: true,
    },
    psy: {
        type: Intl,
        required: true,
    },
    sex: {
        type: Intl,
        required: true,
    },
    total: {
        type: Intl,
        required: true,
    }
})

module.exports = mongoose.model('swearDatabase', swearSchema)