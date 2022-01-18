const mongoose = require('mongoose')
//schema for colors
const colorSchema = new mongoose.Schema({
    color_name:{
        type: String,
        required: true,
        unique: true
    },
    color_code:{
      type: String,
      required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Color', colorSchema);