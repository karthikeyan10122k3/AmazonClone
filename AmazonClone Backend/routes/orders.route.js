import express from 'express';
import { getUserOrder, updateUserOrder } from '../controllers/order.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const route = express.Router();

route.get('/', authenticateJWT, getUserOrder);

route.put('/update-orders', authenticateJWT, updateUserOrder);

export default route;