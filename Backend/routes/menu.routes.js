const express = require("express")
const upload = require("../middleware/multer.middleware")
const { createMenu, getAllMenus, getmenuByID, updatedMenu, deletedMenu } = require("../controller/menu.controller")
const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")


const router = express.Router()

router.post("/create",authMiddleware,adminMiddleware,upload.single("image"),createMenu)

router.get("/",getAllMenus)

router.get("/:id",getmenuByID)

router.put("/update/:id",authMiddleware,adminMiddleware,updatedMenu)

router.delete("/:id",authMiddleware,adminMiddleware,deletedMenu)

module.exports = router