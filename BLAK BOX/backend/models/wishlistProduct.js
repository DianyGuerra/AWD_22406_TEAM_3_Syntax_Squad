const mongoose = require('mongoose');

const wishlistProductSchema = new mongoose.Schema({
    wishlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wishlist',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
}, {
  collection: 'wishlistproduct'
});

module.exports = mongoose.model('WishlistProduct', wishlistProductSchema, 'wishlistproduct');
