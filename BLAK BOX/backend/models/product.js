const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema, 'product');
