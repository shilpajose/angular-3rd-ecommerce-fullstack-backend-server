const mongoose= require('mongoose')

// admin login 
const loginSchema = new mongoose.Schema({
    uname:String,
    psw:String
})

// product
const productSchema = new mongoose.Schema({
    pname:String,
    description:String,
    price:Number,
    image:String,
    rating:Number,
    count:Number
})

// user
const userSchema = new mongoose.Schema({
    email:String,
    psw:String
})

// cart
const cartSchema = new mongoose.Schema({
    userId:String, //from localstorage 
    pId:String,
    pname:String,
    description:String,
    price:Number,
    image:String,
    rating:Number,
    quantity:Number,
    totalprice:Number
})

// wishlist
const wishlistSchema = new mongoose.Schema({
    userId:String, //from localstorage 
    pId:String,
    pname:String,
    description:String,
    price:Number,
    image:String,
    rating:Number,
})




const admins= new mongoose.model("admins",loginSchema)
const products = new mongoose.model("products",productSchema)
const users = new mongoose.model("users",userSchema)
const carts = new mongoose.model("carts",cartSchema)
const wishlists = new mongoose.model("wishlists",wishlistSchema)



module.exports={admins,products,users,carts,wishlists}