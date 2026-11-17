const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const connectDB = require('./db/connectDB');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const { placeOrder, getUserOrders } = require('./controllers/orderControllers');

dotenv.config();

const port = process.env.PORT || process.env.port || 5000;

app.use(cors());
app.use(express.json());

const verifyOrderToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, (process.env.JWT_SECRET || 'shoestop_secret_key_2026'));
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

app.get('/api/health', (req, res) => {
    const dbState = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.status(200).json({
        status: 'UP',
        service: 'shoestop-docker-backend',
        environment: process.env.NODE_ENV || 'production',
        database: dbState,
        uptimeSeconds: Math.floor(process.uptime()),
        memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
        timestamp: new Date().toISOString()
    });
});

app.post('/api/orders', verifyOrderToken, placeOrder);
app.get('/api/orders', verifyOrderToken, getUserOrders);

app.get('/', (req, res) => {
    res.send('ShoeStop API is running');
});

app.use('/', userRoutes);
app.use('/api', productRoutes);

const startServer = async () => {
    try {
        await connectDB(process.env.mongoURI);
        console.log('connected to db');
        app.listen(port, () => {
            console.log(`server started at ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
