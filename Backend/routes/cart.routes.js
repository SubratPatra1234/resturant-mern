const express = require("express")
const router = express.Router()

const protect = require("../middleware/auth.middleware")
const { addToCart, getCart, updateCartQuantity, removeCartItem, clearCart } = require("../controller/cart.controller")

router.post("/add",protect,addToCart)

router.get("/",protect,getCart)

router.put("/update",protect,updateCartQuantity)

router.delete("/remove/:menuItemID",protect,removeCartItem)

router.delete("/clear",protect,clearCart)

module.exports = router