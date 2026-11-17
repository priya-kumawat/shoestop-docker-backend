const Order = require('../modal/orderSchema');
const cart = require('../modal/cartSchema');

const placeOrder = async (req, res) => {
    try {
        const userId = req.user ? (req.user._id || req.user.id) : null;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const { items, totalAmount } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const newOrder = await Order.create({
            user: userId,
            items,
            totalAmount,
            status: 'Confirmed'
        });

        await cart.deleteMany({ user: userId });

        return res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const userId = req.user ? (req.user._id || req.user.id) : null;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { placeOrder, getUserOrders };
