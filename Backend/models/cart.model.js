const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
    unique:true
  },
  items:[
    {
      menuItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Menu",
        required:true
      },
      quantity:{
        type:Number,
        required:true,
        default:1,
        min:1
      }
    }
  ]
},
{
  timestamps:true
})

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart
