const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
  collection: 'order'
});

module.exports = mongoose.model('Order', orderSchema, 'order');
