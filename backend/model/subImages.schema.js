const mongoose = require('mongoose')
//schema for subimages of products
const subImageSchema = new mongoose.Schema({
    product_subImages: [{
        type: String
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('SubImage', subImageSchema);