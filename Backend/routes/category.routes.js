const express= require("express")
const upload = require("../middleware/multer.middleware")
const {addCategory, getAllCategory, categoryById, updatedCategory, deletedCategory} = require("../controller/category.controller")
const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")

const router = express.Router()

router.post("/add",authMiddleware,adminMiddleware,upload.single("image"),addCategory)

router.get("/",getAllCategory)

router.get("/:id",categoryById)

router.put("/update/:id",authMiddleware,adminMiddleware,updatedCategory)

router.delete("/delete/:id",authMiddleware,adminMiddleware,deletedCategory)

module.exports = router