const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantify: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  collection: 'orderproduct'
});

module.exports = mongoose.model('OrderProduct', orderProductSchema, 'orderproduct');
