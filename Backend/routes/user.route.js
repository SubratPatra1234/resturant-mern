const express=require("express")
const { registerUser, loginUser, logoutUser, getUserData } = require("../controller/user.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)

router.get("/getuserdata",authMiddleware,getUserData)


module.exports=router
