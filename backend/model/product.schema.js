const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    product_desc: {
        type: String,
        required: true
    },
    product_rating: {
        type: Number,
        required: true
    },
    product_producer: {
        type: String,
        required: true
    },
    product_cost: {
        type: Number,
        required: true
    },
    product_stock: {
        type: Number,
        required: true
    },
    product_dimension: {
        type: String,
        required: true
    },
    product_material: {
        type: String,
        required: true
    },
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subImages_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubImage',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);