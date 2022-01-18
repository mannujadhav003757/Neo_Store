const Product = require('../model/product.schema')
const Order = require('../model/order.schema')
const mongoose = require('mongoose')


exports.createProduct = async (req, res) => {
    try {
        const tempProduct = req.body

        if (!tempProduct) {
            return res.status(400).send({
                'message': 'unable to add product, please try again',
                'statusCode': 400
            })
        }

        const product = new Product(tempProduct)

        await product.save()

        return res.status(201).send({
            'message': 'product added successfully',
            'statusCode': 201
        })

    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const product = await Product.aggregate([
            {
                $lookup: {
                    from: "colors",
                    localField: "color_id",
                    foreignField: "_id",
                    as: "color_id",
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "category_id",
                },
            },
            {
                $lookup: {
                    from: "subimages",
                    localField: "subImages_id",
                    foreignField: "_id",
                    as: "subImages_id",
                },
            },
            {
                $unwind: {
                    path: "$color_id",
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $unwind: {
                    path: "$category_id",
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $unwind: {
                    path: "$subImages_id",
                    preserveNullAndEmptyArrays: true,
                }
            }
        ])

        if (!product) {
            return res.status(400).send({
                'message': 'record not found',
                'statusCode': 400
            })
        }

        return res.status(200).send({
            'message': 'ok',
            'statusCode': 200,
            'data': product
        })
    } catch (e) {
        return res.status(400).send({
            'message': 'something went wrong, Please try again.',
            'statusCode': 400
        })
    }

}

exports.filetredProduct = async (req, res) => {

    try {
        const category_id = req.query.category_id
        const color_id = req.query.color_id
        const desc = req.query.desc

        let query;

        if(category_id) {
            query = {
                'category_id': {
                    $in: [
                        mongoose.Types.ObjectId(category_id)
                    ]
                }
            }
        } 

        if (color_id) {
            query = {
                'color_id': {
                    $in: [
                        mongoose.Types.ObjectId(color_id)
                    ]
                } 
            }
        }

        if(desc) {
            query = {
                'product_desc': new RegExp(desc, "i")
            }
        }

        if(category_id && color_id) {
            query = {
                'category_id': {
                    $in: [
                        mongoose.Types.ObjectId(category_id)
                    ]
                },
                'color_id': {
                    $in: [
                        mongoose.Types.ObjectId(color_id)
                    ]
                }
    
            }
        }

        const product = await Product.find(query)

        if (!product) {
            return res.status(400).send({
                'message': 'record not found',
                'statusCode': 400
            })
        }

        return res.status(200).send({
            'message': 'ok',
            'statusCode': 200,
            'data': product
        })
    } catch (e) {
        console.log(e)
        return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })
    }
}



exports.addProductToCartCheckout = async (req, res) => {
    try {
        const orderData = req.body
        console.log(req.body)

        if(!orderData) {
            return res.status(400).send({
                'message': 'unable to checkout, please try again',
                'statusCode': 400
            })
        }

        const order = new Order(orderData)

        await order.save()

        return res.status(201).send({
            'message': 'order placed successfully',
            'statusCode': 201
        })


    } catch (e) {
        console.log(e)
        return res.status(400).send({
            'message': 'something went wrong, please try again.',
            'statusCode': 400
        })
    }
}


exports.getOrders = async (req, res) => {
    console.log('calling', req.user)
    try {
        // const order = await Order.aggregate([
        //     {
        //         $match: { customer_id: req.user._id }
        //     },
        //     {
        //         $lookup: {
        //             from: "users",
        //             localField: "customer_id",
        //             foreignField: "_id",
        //             as: "customer_id",
        //         },
        //     },
        //     {
        //         $lookup: {
        //             from: "addresses",
        //             localField: "deliveryAddress",
        //             foreignField: "_id",
        //             as: "deliveryAddress",
        //         },
        //     },

            // { "$unwind": "$product_details" },
            // { "$lookup": {
            //     "from": "products",
            //     "let": { "product_id": "$product_details.product_id" },
            //     "pipeline": [
            //        { "$match": { "$expr": { "$in": [ "$_id", "$$product_id" ] } } }
            //      ],
            //      "as": "product_details.product_id"
            //   }},
            //   { "$unwind": "$product_details.product_id" },
            // {"$unwind":"$product_details"},
            // {"$lookup":{
            //     "from":"products",
            //     "localField":"product_details.product_id",
            //     "foreignField":"_id",
            //     "as":"product_details"
            //   }},
            // {$lookup: {
            //     from: 'products', 
            //     localField: 'product_details.product_id', 
            //     foreignField: '_id', 
            //     as: 'product_id'
            // }
            // },
            // { "$lookup": {
            //     "from": "products",
            //     "let": { "product_id": "$product_details.product_id" },
            //     "pipeline": [
            //       { "$match": { "$expr": { "$eq": [ "$product_details.product_id", "$$product_id" ] } } }
            //     ],
            //     "as": "product_details.product_id"
            //   }},

            // { "$unwind": "$product_details" },
            // { "$unwind": "$product_details.product_id" },

            // { "$lookup": {
            //   "from": "products",
            //   "localField": "product_details",
            //   "foreignField": "_id",
            //   "as": "product_details.product_id",
            // }},          
    
            // {
            //     $unwind: {
            //         path: "$customer_id",
            //         preserveNullAndEmptyArrays: true,
            //     }
            // },
            // {
            //     $unwind: {
            //         path: "$deliveryAddress",
            //         preserveNullAndEmptyArrays: true,
            //     }
            // },
            // {
            //     $unwind: {
            //         path: "$product_details",
            //         preserveNullAndEmptyArrays: true,
            //     }
            // }
        // ])
        

        console.log('Hello', order)

    } catch (e) {

    }
}

