const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    discount: { type: String, default: "0%" },
    features: [{ type: String }],
    sales: { type: Number, default: 0 },
    imageUrl: { type: String, default: "" }, 
    ratings: [
      {
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now }
      }
    ]
}, {
  collection: 'product'
});

module.exports = mongoose.model('Product', productSchema, 'product');
