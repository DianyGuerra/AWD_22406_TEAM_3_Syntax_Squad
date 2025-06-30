const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
  collection: 'cart'
});

module.exports = mongoose.model('Cart', cartSchema, 'cart');
