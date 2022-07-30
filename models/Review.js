const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
author_name:{
    type: String,
    required: true
},
  placeId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;