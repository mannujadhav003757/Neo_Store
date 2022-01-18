const routes = (app) => {
    const User = require('../controller/user.controller') //importing user schema

    const Product = require('../controller/product.controller') //importing product schema

    const Address = require('../controller/address.controller') //importing address schema

    const verifyUser = require("../middleware/auth.middleware") //importing Authentication middleware

    // app.use(verifyUser)

    app.post('/register', User.register)  //route for register existing user

    app.post('/login', User.login)  //route for login

    app.post('/sendOtp', User.sendOtp) //route for send otp for forget password

    app.put('/updatepassword',User.updatepassword) //route for update password
    
    app.get('/profileDetails', verifyUser, User.profileDetails) //route for profile details

    app.put('/changePassword',verifyUser, User.changePassword) //route for change password

    app.get('/commonProducts', Product.getProducts)  //route for get common products

    app.post('/commonProducts', verifyUser, Product.createProduct) //route for add common products

    app.get('/filteredproduct',Product.filetredProduct) //route for filltter products

    app.post('/addAddress',verifyUser, Address.addAddress) //route for add existing address

    app.get('/getAddress',verifyUser, Address.getAddress) //route for getting address

    app.post('/addProductToCartCheckout', verifyUser, Product.addProductToCartCheckout) //route for add product to cart

    app.get('/getOrders', verifyUser, Product.getOrders) //route for get orders details



}

module.exports = routes