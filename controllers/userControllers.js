const Users = require('../modal/user')
const asyncHandler = require("express-async-handler");
const generateToken = require('../utility/utility');
const jwt = require("jsonwebtoken")

const signUp = asyncHandler(async (req, res) => {
    const name = (req.body.name || '').trim();
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists with this email" });
    }

    const user = await Users.create({ name, email, password });

    if (user) {
        return res.status(201).json({
            name: user.name,
            email: user.email,
            _id: user._id,
            token: generateToken(user._id, user.name)
        });
    } else {
        return res.status(400).json({ message: "Invalid user data" });
    }
});

const login = asyncHandler(async (req, res) => {
    const email = (req.body.email || '').trim().toLowerCase();
    const password = req.body.password;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Account not found. Please Sign Up first.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Wrong password. Please try again.' });
        }

        const token = jwt.sign({ _id: user._id }, (process.env.JWT_SECRET || 'shoestop_secret_key_2026'), {
            expiresIn: '7d'
        });

        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error during login' });
    }
});

module.exports = { signUp, login };
