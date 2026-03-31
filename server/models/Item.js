const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingPrice: {
        type: Number,
        required: true
    },
    currentBid: {
        type: Number,
        default: 0
    },
    highestBidder: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Item', ItemSchema);
