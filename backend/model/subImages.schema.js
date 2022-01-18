const mongoose = require('mongoose')

const subImageSchema = new mongoose.Schema({
    product_subImages: [{
        type: String
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('SubImage', subImageSchema);