const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    total_cartCost: {
        type: Number,
        required: true
    },
    flag: {
        type: String,
        required: false,
        enum: ["checkout"]
    },
    product_details: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        product_cost: {
            type: Number,
            required: true
        },
        total_productCost: {
            type: Number,
            required: true
        }
    }],

}, {
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema);