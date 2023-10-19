const express= require('express')

const {adminLogin,addNewproduct,getProduct,editProduct,
    deleteProduct,getSingleProduct,userSignup,userLogin,
    addToCart,cartCount,cartItems, totalprice, 
    quantityIncrement,quantityDecrement,removeItem, 
    addToWishlit,wishlistItems,removeWishlistItem,getUsers,deleteUser} = require('../controllers/adminlogic')

const router=new express.Router()


//login
router.post('/admin/login',adminLogin)    

// add product
router.post('/admin/add',addNewproduct)

// get products
router.get('/admin/product-access',getProduct)

// edit products
router.put('/product-update/:id',editProduct)

// one product get for edit
router.get('/one-product/:id',getSingleProduct)


// delete products
router.delete('/product-delete/:id',deleteProduct)

// user register
router.post('/user-register',userSignup)

// user Login
router.post('/user-login',userLogin)

// cart
router.post('/addtocart',addToCart)

// cart count
router.get('/cart-count/:userId',cartCount)

// cart items display
router.get('/cart-items/:userId',cartItems)

// Count Increment
router.post('/count-increment')

// total price
router.get(`/price-total/:userId`,totalprice)

// increment
router.get(`/quantity-update-inc/:_id`,quantityIncrement)

// decrement
router.get(`/quantity-update-dec/:_id`,quantityDecrement)

// remove item
router.delete(`/remove-item/:_id`,removeItem)

// add to wishlist
router.post('/add-to-wishlist',addToWishlit)

// display products in wishlist
router.get('/wishlist-items/:userId',wishlistItems)

router.delete(`/remove-wishlistitem/:_id`,removeWishlistItem)

// admin-user-management
router.get('/user-access',getUsers)

// delete-user 
router.delete('/user-delete/:_id',deleteUser)



module.exports=router 