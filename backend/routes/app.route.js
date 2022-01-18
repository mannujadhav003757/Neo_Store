const routes = (app) => {
    const User = require('../controller/user.controller')

    const Product = require('../controller/product.controller')

    const Address = require('../controller/address.controller')

    const verifyUser = require("../middleware/auth.middleware")

    // app.use(verifyUser)

    app.post('/register', User.register)

    app.post('/login', User.login)

    app.post('/sendOtp', User.sendOtp)

    app.put('/updatepassword',User.updatepassword)
    
    app.get('/profileDetails', verifyUser, User.profileDetails)

    app.put('/changePassword',verifyUser, User.changePassword)

    app.get('/commonProducts', Product.getProducts)

    app.post('/commonProducts', verifyUser, Product.createProduct)

    app.get('/filteredproduct',Product.filetredProduct)

    app.post('/addAddress',verifyUser, Address.addAddress)

    app.get('/getAddress',verifyUser, Address.getAddress)

    app.post('/addProductToCartCheckout', verifyUser, Product.addProductToCartCheckout)

    app.get('/getOrders', verifyUser, Product.getOrders)



}

module.exports = routes