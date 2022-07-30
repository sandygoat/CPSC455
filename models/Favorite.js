
const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;