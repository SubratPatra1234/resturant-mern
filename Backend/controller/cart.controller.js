const Cart = require("../models/cart.model");
const Menu = require("../models/menu.model");

const addToCart = async (req, res) => {
  try {
    const { menuItemID, quantity } = req.body;

    const menuItem = await Menu.findById(menuItemID);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item is not found",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [
          {
            menuItem: menuItemID,
            quantity: quantity || 1,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Item added to cart",
        cart,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.menuItem.toString() === menuItemID,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        menuItem: menuItemID,
        quantity: quantity || 1,
      });
    }

    await cart.save()

    res.status(200).json({
      success:true,
      message:"Item added to cart",
      cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getCart = async(req,res)=>{
  try {
    const cart = await Cart.findOne({
      user : req.user.id
    }).populate("items.menuItem")

    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found",
        
      })
    }

    res.status(200).json({
      success:true,
      cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


const updateCartQuantity = async(req,res)=>{
  try {
    const { menuItemID,quantity } = req.body

    const cart = await Cart.findOne({user:req.user.id})

    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found"
      })
    }

    const itemIndex = cart.items.findIndex((item)=>item.menuItem.toString() === menuItemID)

    if(itemIndex === -1){
      return res.status(404).json({
        success:false,
        message:"Item not found in cart"
      })
    }

    cart.items[itemIndex].quantity = quantity

    await cart.save()

    res.status(200).json({
      success:true,
      message:"Cart quantity updated",
      cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


const removeCartItem = async(req,res)=>{
  try {
    const { menuItemID } = req.params

    const cart = await Cart.findOne({user:req.user.id})

    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found",
      })
    }
    const itemIndex = cart.items.findIndex((item)=>item.menuItem.toString()===menuItemID)

    if(itemIndex===-1){
      return res.status(404).json({
        success:false,
        message: "Item not found in cart"
      })
    }

    cart.items.splice(itemIndex,1)

    await cart.save()

    res.status(200).json({
      success:true,
      message:"Item removed from cart",
      cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


const clearCart = async(req,res)=>{
  try {
    const cart = await Cart.findOne({user:req.user.id})

    if(!cart){
      return res.status(404).json({
        success:false,
        message:"Cart not found"
      })
    }

    cart.items=[]

    await cart.save()

    res.status(200).json({
      success:true,
      message:"Cart cleared sucessfull",
      cart
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {addToCart,getCart,updateCartQuantity,removeCartItem,clearCart}
