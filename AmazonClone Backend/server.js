import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoute from './routes/product.route.js'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cartRoute from './routes/cart.route.js'
import ordersRoute from './routes/orders.route.js'

const app = express();
app.use(express.json())
dotenv.config();
app.use(cors({
    origin: "http://localhost:4200"
}));

const PORT = process.env.PORT || 7000;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to DataBase successfully!");

        app.listen(PORT, (req,res) => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection to MongoDB Atlas failed!", error);
    });

    app.use('/api/product',productRoute)
    app.use('/api/user',userRoute)
    app.use('/api/auth',authRoute)
    app.use('/api/user/cart',cartRoute)
    app.use('/api/user/orders',ordersRoute)