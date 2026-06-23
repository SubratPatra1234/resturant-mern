const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

const placeOrder = async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.menuItem");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    const totalAmount = cart.items.reduce(
      (total, item) =>
        total + item.menuItem.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      totalAmount,
      address: req.body.address
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id
    })
    .populate("items.menuItem")
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getOrderById = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.menuItem");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const validStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  placeOrder,getMyOrders,getOrderById,updateOrderStatus
};