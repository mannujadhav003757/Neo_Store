const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        max: 25,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: "Please enter valid first name"
        }
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        max: 25,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z]+$/.test(v);
            },
            message: "Please enter valid last name"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v)
            },
            message: "Please enter valid email"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/.test(v)
            },
            message: "Please enter valid password"
        }
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return /[6789][0-9]{9}/.test(v)
            },
            message: "Please enter valid mobile"
        }
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    deliveryAddress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: false 
    }],
    token: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);