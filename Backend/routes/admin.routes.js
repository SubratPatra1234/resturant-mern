const express = require("express")

const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")

const router = express.Router()

router.get(
  "/admin",
  authMiddleware,
  adminMiddleware,
  (req, res) => {

    res.json({
      message: "Welcome Admin"
    })

  }
  
)

module.exports = router