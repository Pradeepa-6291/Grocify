const express = require("express");
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus
} = require("../controller/orderController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getUserOrders);
router.get("/:id", auth, getOrderById);
router.put("/:id/status", auth, updateOrderStatus);

module.exports = router;