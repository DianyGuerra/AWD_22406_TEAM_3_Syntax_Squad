const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  description: { type: String }
}, {
  collection: 'category'
});

module.exports = mongoose.model('Category', categorySchema, 'category');
