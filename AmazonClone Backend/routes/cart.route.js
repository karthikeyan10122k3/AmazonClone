import express from 'express';
import { getUserCart, updateUserCart } from '../controllers/cart.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const route = express.Router();

route.get('/', authenticateJWT, getUserCart);

route.put('/update-cart', authenticateJWT, updateUserCart);

export default route;