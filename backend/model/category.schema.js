const mongoose = require('mongoose')
//schema for categories
const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    },
    category_image: {
      type: String,
      required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema);