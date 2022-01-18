
const jwt = require('jsonwebtoken');
const User = require('../model/user.schema')

const verifyUser = async (req, res, next) => {
        const token = req.header("token")

        if (!token) {
            return res.status(401).send({
                'message': 'unauthorized, please login',
                'statusCode': 401
            })
        }

        try {
            const decode = jwt.verify(token, "neostore")

            const user = await User.findOne({ _id: decode._id })

            if (!user) {
                return res.status(400).send({
                    'message': 'invalid token, please login',
                    'statusCode': 400
                })
            }

            req.token = token
            req.user = user

            next()

        } catch (e) {
            return res.status(400).send({
                'message': 'something went wrong, please try again.',
                'statusCode': 400
            })
        }
}


module.exports = verifyUser