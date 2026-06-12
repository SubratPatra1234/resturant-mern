const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async(req,res)=>{
  try {
    const {name,email,password}=req.body

    if(!name || !email || !password){
      return res.status(400).json({
        message:"All fields are required"
      }) 
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
      return res.status(400).json({
        message:"User already exist"
      })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      
    })

    res.status(201).json({
      message:"User registered sucessfully",
      user
    })
  } catch (error) {
    res.status(500).json({
      message:"Internal server error"
    })
  }
}

const loginUser = async(req,res)=>{
  try {

    const{email,password}=req.body

    if(!email || !password){
      return res.status(400).json({
        message : "All fields are required"
      })
    }

    const user = await User.findOne({email})

    if(!user){
      return res.status(400).json({
        message:"Invalid credential"
      })
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(400).json({
        message:"Invalid Credential"
      })
    }

    const token = jwt.sign(
      { 
        id:user._id,
        isAdmin:user.isAdmin
      },
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    )

    res.cookie("token",token,{
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000

    })

    res.status(201).json({
      message:"Login successfully",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
      }
    })
    
  } catch (error) {
    res.status(500).json({
      message:"Internal server error"
    })
  }

}
  const logoutUser = async(req,res)=>{
    try {
      res.clearCookie("token")
      res.status(201).json({
        message:"Logout Successfully"
      })
    } catch (error) {
      res.status(500).json({
        message:"Internal Server error"
      })
    }
  }

  const getUserData = async(req,res)=>{
    try {
      const user = await User.findById(req.user.id).select("-password")
      
      if(!user){
        return res.status(404).json({
          message:"User not found"
        })
      }

      res.status(200).json({
        sucess:true,
        user
      })
    } catch (error) {
      res.status(500).json({
        message:error.message
      })
    }
  }

module.exports = {registerUser,loginUser,logoutUser,getUserData}