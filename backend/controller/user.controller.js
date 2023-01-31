const User = require('../model/user.schema')
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator')

//contoller for user related functions

//function for registering existing user
exports.register = async (req, res) => {
    let { fname, lname, email, password, mobile, gender, deliveryAddress } = req.body

    try {

        let user = await User.findOne({ email })
    
        if (user) {
            return res.status(400).send({
                'message': 'user already exist, please try again.',
                'statusCode': 400
            })
        }
    
        const salt = await bcrypt.genSalt(10)
    
        password = await bcrypt.hash(password, salt)
    
        user = new User({
            fname, lname, email, password, mobile, gender, deliveryAddress
        })
    
        await user.save()
    
        return res.status(201).send({
            'message': 'user registered successfully, please login.',
            'statusCode': 201
        })

    } catch(e) {
        console.log(e)
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}

//function for user log in
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(401).send({
                'message': 'Invalid email, please try again',
                'statusCode': 401
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).send({
                'message': 'Invalid password, please try again',
                'statusCode': 401
            })
        }

        const token = jwt.sign({ _id: user.id.toString() }, "neostore")

        user.token = token

        await user.save()

        delete user._doc.password
        delete user._doc.__v

        return res.status(200).send({
            'message': 'login successful',
            'statusCode': 200,
            'data': user
        })

    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}

//function for forget password otp generation
exports.sendOtp = async (req, res) => {
    try{
        
        const { email} = req.body
        let user = await User.findOne({ email })

        if (user) {
            const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mannujadhav003757@gmail.com',
                    pass: 'Sweetangel@1432'
                }
            });
    
            let mailDetails = {
                from: 'mannujadhav003757@gmail.com',
                to: email,
                subject: 'Verify Email',
                text: `Hello, your OTP is: ${otp}.`
            };
              
            mailTransporter.sendMail(mailDetails, (err, data) => {
                if(err) {
                    console.log('Error Occurs', err);
                } else {
                    console.log('Email sent successfully');
                }
            })

            return res.status(200).send({
                'message': 'OTP sent',
                'statusCode': 200,
                'data': {
                    otp:  otp
                }
            })
        }

        else{
            return res.status(400).send({
                'message': 'Email Not Found',
                'statusCode': 400
            })
        }
    }
    catch(e){
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}
//function for update password
exports.updatepassword  = async (req,res) =>{
    
    try{
        const salt = await bcrypt.genSalt(10)
    
        const password = await bcrypt.hash(req.body.password, salt)
        const tempUser = await User.findOneAndUpdate({email: req.body.email}, {password: password})

        if (!tempUser) {
           return res.status(400).send({
              'message':"User not found, please try again",
              'statusCode': 400
           })
        }
        return res.status(200).send({
            'message': "Password updated successfully, please login",
            'statusCode': 200
        })     
    }
    catch (e){
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
    })
}
}

exports.sendOtp = async (req, res) => {
    try{
              
        const { email} = req.body
        let user = await User.findOne({ email })
        if (user) {
            const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
            
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mannujadhav003757@gmail.com',
                    pass: '****************'
                }
            });
    
            let mailDetails = {
                from: 'mannujadhav003757@gmail.com',
                to: email,
                subject: 'Verify Email',
                text: `Hello, your OTP is: ${otp}.`
            };
              
            mailTransporter.sendMail(mailDetails, (err, data) => {
                if(err) {
                    console.log('Error Occurs', err);
                } else {
                    console.log('Email sent successfully');
                }
            })

            return res.status(200).send({
                'message': 'OTP sent',
                'statusCode': 200,
                'data': {
                    otp:  otp
                }
            })
        }

        else{
            return res.status(400).send({
                'message': 'Email Not Found',
                'statusCode': 400
            })
        }
    }
    catch(e){
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }
}
//function for getting profile details
exports.profileDetails  = async (req,res) =>{
    try{        
        const user = await User.findOne({ _id: req.user._id })

        if(!user) {
            return res.status(400).send({
                'message': 'Invalid Token,Please Authenticate',
                'statusCode': 400
            }) 
        } else {
            delete user._doc.password
            delete user._doc.__v

            return res.status(200).send({
                'message': 'Ok',
                'statusCode': 200,
                'data': user
            }) 
        }
    }
    catch(e) {
        return res.status(400).send({
            'message': "Something Went Wrong, Please Try Again",
            'statusCode': 400
        })
    }
}

//function for change password
exports.changePassword  = async (req,res) =>{
    
    try{
        const salt = await bcrypt.genSalt(10)
    
        const password = await bcrypt.hash(req.body.password, salt)
        const tempUser = await User.findOneAndUpdate({email: req.body.email}, {password: password})

        if (!tempUser) {
           return res.status(400).send({
              'message':"User not found, please try again",
              'statusCode': 400
           })
        }
        return res.status(200).send({
            'message': "Password updated successfully, please login",
            'statusCode': 200
        })     
    }
    catch (e){
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
    })
}
}


   

