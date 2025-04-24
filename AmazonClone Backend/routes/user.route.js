import express from 'express';
import { deleteUser, editUser, getUser } from '../controllers/user.controller.js';
import { getUserCart, updateUserCart } from '../controllers/cart.controller.js';
import { getUserOrder, updateUserOrder } from '../controllers/order.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const route = express.Router();

route.get('/', authenticateJWT, getUser);

route.put('/:id', authenticateJWT, editUser);

route.delete('/:id', authenticateJWT, deleteUser);

export default route;