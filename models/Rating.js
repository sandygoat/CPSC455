const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
  placeId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;