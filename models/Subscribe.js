const mongoose = require('mongoose');

const SubscribeSchema = new mongoose.Schema({
  subscriber: {
    type: String,
    required: true
  },
  contentPoster: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Subscribe = mongoose.model('Subscribe', SubscribeSchema);

module.exports = Subscribe;