const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require('dotenv')
const connectDB = require('./db/connectDB')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
dotenv.config()

const port = process.env.port

app.use(express.json());
app.use(cors())

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.use('/' , userRoutes)
app.use('/api' , productRoutes)

const startServer = async ()=>{
    try{
       
        await connectDB(process.env.mongoURI)
        console.log('connected to db');
        
const mongoose = require('mongoose');
const { placeOrder, getUserOrders } = require('./controllers/orderControllers');

app.get('/api/health', (req, res) => {
    const dbState = require('mongoose').connection.readyState === 1 ? 'Connected' : 'Disconnected';
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

app.post('/api/orders', protect, placeOrder);
app.get('/api/orders', protect, getUserOrders);

app.listen(port , ()=>{
            console.log(`server started at ${port}`);
        })
    }
    catch(error){
        console.log(error);
    }
}


startServer()