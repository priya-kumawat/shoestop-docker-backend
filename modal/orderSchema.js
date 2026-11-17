const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: String, required: true },
    items: [
        {
            title: String,
            company: String,
            price: Number,
            quantity: Number,
            image: String
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Confirmed' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
