const Menu = require("../models/menu.model")

const createMenu = async(req,res)=>{
  try {
    const {name,description,price,category} = req.body

    if(!name || !description || !price || !category || !req.file){
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const menu = await Menu.create({
      name,
      description,
      price,
      image:req.file.path,
      category
    })

    res.status(201).json({
      message:"Menu created succsessfully",
      menu
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

const getAllMenus = async(req,res)=>{
  try {
    const menus = await Menu.find().populate("category")

    res.status(200).json({
      success:true,
      count : menus.length,
      menus
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

const getmenuByID = async(req,res)=>{
  try {
    const { id } = req.params

    const menu = await Menu.findById(id).populate("category")

    if(!menu){
      return res.status(404).json({
        message:"Menu not found"
      })
    }

    res.status(200).json(menu)
  } catch (error) {
     res.status(500).json({
      message:error.message
    })
  }
}


const updatedMenu = async(req,res)=>{
  try {
    const { id } = req.params
    
    const menu = await Menu.findById(id)

    if(!menu){
      return res.status(404).json({
        message:"Menu Not Found"
      })
    }

    const updatedmenu = await Menu.findByIdAndUpdate(
      id,
      req.body,
      {new:true}
    )

    res.status(200).json({
      message:"Menu updated successfully",
      updatedmenu
    })
  } catch (error) {
     res.status(500).json({
      message:error.message
    })
  }
}

const deletedMenu = async(req,res)=>{
  try {
    const { id } = req.params

    const menu = await Menu.findById(id)

    if(!menu){
      return res.status(404).json({
        message:"Menu not found"
      })
    }

    await Menu.findByIdAndDelete(id)

    res.status(200).json({
      message:"Menu deleted sucessfully"
    })
  } catch (error) {
     res.status(500).json({
      message:error.message
    })
  }
}

module.exports = {createMenu,getAllMenus,getmenuByID,updatedMenu,deletedMenu}