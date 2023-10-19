const { admins, products, users, carts, wishlists } = require("../models/collections")


const adminLogin = (req, res) => {
  const { uname, psw } = req.body
  //   console.log(uname+psw);
  //users table/collection il poyi nokum acno undonnu....undel then use for resolve
  admins.findOne({ uname, psw }).then(data => {

    if (data) {
      //token generation
      //   console.log(uname+psw);

      res.status(200).json({
        message: "Login success",
        status: true,
        statusCode: 200,
      })
    }
    else {
      res.status(404).json({
        message: "Incorrect login details",
        status: false,
        statusCode: 404
      })
    }
    // res.json(data)
  })
}

// Add product

const addNewproduct = (req, res) => {
  const { pname, description, price, image, rating, count } = req.body
  const newProduct = new products({
    pname,
    description,
    price,
    image,
    rating,
    count
  })
  newProduct.save()

  res.status(200).json({
    message: "Prouct Added",
    status: true,
    statusCode: 200
  })
}

// get all prod
const getProduct = (req, res) => {
  products.find().then(data => {
    if (data) {
      res.status(200).json({
        message: data,
        status: true,
        statusCode: 200
      })
    }
  })
}

// edit product

const editProduct = (req, res) => {
  const { id } = req.params
  const { pname, description, price, image, rating, count } = req.body
  products.findOne({ _id: id }).then(pdata => {
    pdata.pname = pname,
      pdata.description = description,
      pdata.price = price,
      pdata.image = image,
      pdata.rating = rating,
      pdata.count = count

    pdata.save()
    res.status(200).json({
      message: pdata,
      status: true,
      statusCode: 200
    })

  })
}

// delete product
const deleteProduct = (req, res) => {
  const { id } = req.params
  products.deleteOne({ _id: id }).then(data => {
    res.status(200).json({
      message: "product deleted",
      statusCode: 200,
      status: true
    })
  })
}

// get one product

const getSingleProduct = (req, res) => {
  const { id } = req.params
  products.findOne({ _id: id }).then(data => {
    if (data) {
      res.status(200).json({
        message: data,
        statusCode: 200,
        status: true
      })
    } else {
      res.status(404).json({
        message: "no data",
        status: false,
        statusCode: 404
      })
    }
  })
}
// user register 

const userSignup = (req, res) => {
  const { email, psw } = req.body
  users.findOne({ email }).then(user => {
    if (user) {
      res.status(404).json({
        message: "User already exists",
        statusCode: 404,
        status: false
      })
    } else {
      newUser = new users({
        email, psw
      })
      newUser.save()
      res.status(200).json({
        message: "Registered",
        status: true,
        statusCode: 200
      })
    }

  })
}

// user - login

const userLogin = (req, res) => {
  const { email, psw } = req.body
  users.findOne({ email }).then(user => {
    if (user) {
      res.status(200).json({
        message: "login success",
        status: true,
        statusCode: 200,
        _id: user.id   //to store id in localstorae
      })
    }
    else {
      res.status(404).json({
        message: "User not found",
        statusCode: 404,
        status: false
      })
    }
  })
}

// cart
const addToCart = (req, res) => {
  const { userId, pId } = req.body

  carts.findOne({ userId, pId }).then(data => {
    if (data) {
      data.quantity += 1
      data.totalprice = data.quantity * data.price
      data.save()
      res.status(200).json({
        message: "Product added to cart",
        statusCode: 200,
        status: true
      })

    } else {
      products.findOne({ _id: pId }).then(product => {
        if (product) {
          newCart = new carts({
            userId,
            pId,
            pname: product.pname,
            description: product.description,
            price: product.price,
            image: product.image,
            rating: product.rating,
            quantity: 1,
            totalprice: product.price
          })
          newCart.save()
          res.status(200).json({
            message: "Product added to cart",
            statusCode: 200,
            status: true
          })
        }
      })
    }
  })
}

// cart count
const cartCount = (req, res) => {
  const { userId } = req.params
  carts.find({ userId }).then(products => {
    if (products) {
      res.status(200).json({
        message: products.length,
        statusCode: 200,
        status: true
      })
    }
  })
}

// cartPage items display
const cartItems = (req, res) => {
  const { userId } = req.params
  carts.find({ userId }).then(products => {
    if (products) {
      res.status(200).json({
        message: products,
        statusCode: 200,
        status: true
      })
    }
  })
}

// total price
const totalprice = (req, res) => {
  const { userId } = req.params
  carts.find({ userId }).then(products => {
    if (products) {
      // console.log(products);
      if (products.length > 0) {
        total = products.map(i => i.totalprice).reduce((l1, l2) => l1 + l2)
        // console.log(total);
        // console.log(products);
        res.status(200).json({
          message: total,
          statusCode: 200,
          status: true
        })
      }
    }
  })
}

// count increment
const quantityIncrement = (req, res) => {
  const { _id } = req.params
  carts.findOne({ _id }).then(data => {
    if (data) {
      data.quantity += 1
      data.totalprice = data.price * data.quantity
      data.save()
      res.status(200).json({
        message: data.quantity,
        statusCode: 200,
        status: true,
        price: data.totalprice
      })
    }
  })
}

// Decrement

const quantityDecrement = (req, res) => {
  const { _id } = req.params
  carts.findOne({ _id }).then(data => {
    if (data) {
      if (data.quantity > 1) {
        data.quantity -= 1
        data.totalprice = data.price * data.quantity
        data.save()
        res.status(200).json({
          message: data.quantity,
          statusCode: 200,
          status: true,
          price: data.totalprice
        })
      }
      else {
        res.status(404).json({
          message: "Remove item from cart",
          statusCode: 404,
          status: true,
        })
      }
    }
  })
}

// removeItem
const removeItem = (req, res) => {
  const { _id } = req.params
  carts.deleteOne({ _id }).then(data => {

    res.status(200).json({
      message: "product removed from cart",
      status: true,
      statusCode: 200
    })

  })
}

// wishlist
const addToWishlit = (req, res) => {
  const { userId, pId } = req.body

  wishlists.findOne({ userId, pId }).then(data => {
    if (data) {
      res.status(400).json({
        message: "Product already added to the wishlist",
        statusCode: 400,
        status: false
      })

    } else {
      products.findOne({ _id: pId }).then(product => {
        if (product) {
          newWishlist = new wishlists({
            userId,
            pId,
            pname: product.pname,
            description: product.description,
            price: product.price,
            image: product.image,
            rating: product.rating,
          })
          newWishlist.save()
          res.status(200).json({
            message: "Product added to wishlist",
            statusCode: 200,
            status: true
          })
        }
      })
    }
  })
}

// wishlistItems
const wishlistItems = (req, res) => {
  const { userId } = req.params
  wishlists.find({userId}).then(product => {
    res.status(200).json({
      message: product,
      status: true,
      statusCode: 200
    })
  })
}

// remove wishlist
const removeWishlistItem = (req, res) => {
  const { _id } = req.params
  wishlists.deleteOne({ _id }).then(data => {

    res.status(200).json({
      message: "product removed from wishlist",
      status: true,
      statusCode: 200
    })

  })
}

const getUsers = (req,res)=>{
  users.find().then(data=>{
    if(data){
      res.status(200).json({
        message:data,
        status:true,
        statusCode:200
      })
    }
  })
}

// deleteUser
const deleteUser=(req,res)=>{
  const {_id}=req.params
  users.deleteOne({_id}).then(data=>{
    carts.deleteMany({userId:_id}).then(data=>{
      wishlists.deleteMany({userId:_id}).then(data=>{
        res.status(200).json({
          message:"user deleted",
          statusCode:200,
          status:true
        })
      })
    })
    
  })
}

module.exports = {
  adminLogin, addNewproduct, getProduct, editProduct,
  deleteProduct, getSingleProduct, userSignup, userLogin,
  addToCart, cartCount, cartItems, totalprice,
  quantityIncrement, quantityDecrement, removeItem, addToWishlit, 
  wishlistItems, removeWishlistItem,getUsers,deleteUser
} 