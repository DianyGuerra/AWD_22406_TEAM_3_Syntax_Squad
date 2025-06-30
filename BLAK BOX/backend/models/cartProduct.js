const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  collection: 'cartproduct'
});

module.exports = mongoose.model('CartProduct', cartProductSchema, 'cartproduct');
