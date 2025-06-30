const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  collection: 'wishlist'
});

module.exports = mongoose.model('Wishlist', wishlistSchema, 'wishlist');
