const cart = require("../modal/cartSchema");

const addcarts = async (req, res) => {
    try {
        const { title, image, company, price } = req.body;
        const userId = req.user ? req.user._id : null;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const existingProduct = await cart.findOne({ title: title, user: userId });
        if (existingProduct) {
            return res.status(202).json({ result: "already in cart list" });
        }
        const cartProduct = await cart.create({
            title, image, company, price, quantity: 1, user: userId
        });
        return res.status(201).json({
            message: 'Product added to cart',
            cart: cartProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

const getAllcartProducts = async (req, res) => {
    try {
        const userId = req.user ? req.user._id : null;
        const query = userId ? { user: userId } : {};
        const allcartProducts = await cart.find(query);
        return res.json(allcartProducts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const removeFromcart = async (req, res) => {
    try {
        const id = req.params.id || req.params._id;
        const deletecart = await cart.findByIdAndDelete(id);
        return res.json(deletecart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { addcarts, getAllcartProducts, removeFromcart };
