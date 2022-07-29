const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    }
});

const Favorite = mongoose.model('Favorite', FavoriteSchema);

module.exports = Favorite;