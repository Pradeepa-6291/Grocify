const Order = require("../model/Order");

// Create new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, deliveryAddress, phone } = req.body;
        
        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            deliveryAddress,
            phone
        });

        const savedOrder = await order.save();
        await savedOrder.populate('items.product');
        
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user orders
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('items.product')
            .populate('user', 'firstName lastName email');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('items.product');
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus
};