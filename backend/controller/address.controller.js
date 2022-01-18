const Address = require('../model/address.schema')
const mongoose = require('mongoose')

// controller of all address routes

//route for adding address
exports.addAddress = async (req, res) => {
    let tempAddress = req.body
    try {
        if (tempAddress.customer_id) {
            const address = new Address(tempAddress)

            await address.save()

            return res.status(201).send({
                'message': 'address stored successfully',
                'statusCode': 201
            })
        }
        else {
            return res.status(400).send({
                'message': 'unable to store address, please try again',
                'statusCode': 400
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(400).send({
            'message': 'something went wrong, please try again',
            'statusCode': 400
        })

    }
}

//route for getting Address
exports.getAddress = async (req, res) => {
    try {
        if (req.user._id) {
            const address = await Address.find({
                'customer_id': {
                    $in: [
                        mongoose.Types.ObjectId(req.user._id)
                    ]
                }
            })

            if (!address) {
                return res.status(400).send({
                    'message': 'record not found',
                    'statusCode': 400
                })
            }

            return res.status(200).send({
                'message': 'ok',
                'statusCode': 200,
                'data': address
            })
        }
    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })
    }
}