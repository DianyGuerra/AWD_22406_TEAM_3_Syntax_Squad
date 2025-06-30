const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true,
    min: 0
  },
  minimumQuantity: {
    type: Number,
    required: true,
    min: 3
  },
  lastRestockDate: {
    type: Date,
    default: Date.now,
    required: true,
    validate: {
      validator: function(v) {
        return v <= Date.now();
      },
      message: 'Last restock date cannot be in the future.'
    },
  }
}, {
  collection: 'inventory'
});

module.exports = mongoose.model('Inventory', inventorySchema, 'inventory');
