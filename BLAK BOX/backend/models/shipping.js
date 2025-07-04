const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    shippingCompany: {
        type: String,
        required: true
    },
    trackingNumber: {
        type: String,
        required: true
    },
    shippingDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    estimatedDeliveryDate: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Correcto
        required: true
    }
}, {
  collection: 'shipping'
});

module.exports = mongoose.model('Shipping', shippingSchema, 'shipping');
