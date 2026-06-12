const cloudinary = require("../config/cloudinary/cloudinary")
const Category = require("../models/category.model")


const addCategory = async(req,res)=>{
  try {
    const{name}=req.body
    if(!req.file){
      return res.status(400).json({
        message : "Image is required"
      })
    }

    const result = await cloudinary.uploader.upload(
      req.file.path
    )
    
    console.log(result)

    const category = await Category.create({
      name,
      image: result.secure_url
    })

    res.status(201).json({
      message : "Food Added Sucessfully",
      category
    })
  } catch (error) {
    res.status(501).json({
      message:error.message
    })
  }
}


const getAllCategory = async(req,res)=>{
  try {
    const category = await Category.find()

    res.status(200).json({
      success : true,
      count : category.length,
      category
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


const categoryById = async(req,res)=>{
  try {
    const {id} = req.params

    const category = await Category.findById(id)

    if(!category){
      return res.status(404).json({
        success : false,
        message : "Category Not Found"
      })
    }

    res.status(201).json({
      success : true,
      category
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


const updatedCategory = async(req,res)=>{
  try {
    const { id } = req.params
    const {name} = req.body

    const category = await Category.findById(id)

    if(!category){
      return res.status(404).json({
        success : false,
        message : "Category Not Found"
      })
    }
    category.name = name || category.name

    await category.save()

    res.status(201).json({
      success : true,
      message : "Category Updated Successfully",
      category
    })
  } catch (error) {
    res.status(500).json({
      success : false,
      message: error.message
    })
  }
}


const deletedCategory = async(req,res)=>{
  try {
    const { id } = req.params

    const category = await Category.findById(id)

    if(!category){
      return res.status(404).json({
        success : false,
        message : "Food Not Found"
      })
    }

    await category.deleteOne()

    res.status(201).json({
      success : true,
      message : "Food Deleted Sucessfully"
    })

  } catch (error) {

    res.status(500).json({
      success : false,
      message : error.message
    })
    
  }
}

module.exports = {addCategory,getAllCategory,categoryById,updatedCategory,deletedCategory}