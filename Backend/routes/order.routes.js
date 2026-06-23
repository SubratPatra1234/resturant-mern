const express = require("express");

const router = express.Router();

const { placeOrder, getMyOrders, getOrderById, updateOrderStatus } = require("../controller/order.controller");

const auth = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

router.post("/place", auth, placeOrder);

router.get("/my-orders", auth, getMyOrders);

router.get("/:id", auth, getOrderById);

router.put("/:id/status",auth, adminMiddleware, updateOrderStatus);

module.exports = router;