import express from 'express';
import { deleteUser, editUser, getUser } from '../controllers/user.controller.js';
import { getUserCart, updateUserCart } from '../controllers/cart.controller.js';
import { getUserOrder, updateUserOrder } from '../controllers/order.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const route = express.Router();

// User routes // GET /api/user/
route.get('/', (req, res, next) => {
    console.log("GET /api/user -> getUser");
    next();
  }, authenticateJWT, getUser); 

// Cart route // GET /api/user/cart
route.get('/cart', (req, res, next) => {
  console.log("GET /api/user/cart  -> getUserCart");
  next();
}, authenticateJWT, getUserCart); 

// Order route // GET /api/user/orders
route.get('/orders', (req, res, next) => {
    console.log("GET /api/user/orders  -> getUserOrder");
    next();
  }, authenticateJWT, getUserOrder); 

// Cart Route // PUT /api/user/cart
route.put('/update-cart', (req, res, next) => {
    console.log("PUT /api/user/cart-update  -> updateUserCart");
    next();
  }, authenticateJWT, updateUserCart); 

// Order route // PUT /api/user/orders
route.put('/update-orders', (req, res, next) => {
    console.log("PUT /api/user/orders-update  -> updateUserOrder");
    next();
  }, authenticateJWT, updateUserOrder); 

// User routes // PUT /api/user/:id
  route.put('/:id', (req, res, next) => {
    console.log("PUT /api/user/:id -> editUser");
    next();
  }, authenticateJWT, editUser); 

// User routes // DELETE /api/user/:id 
route.delete('/:id', (req, res, next) => {
    console.log("DELETE /api/user/:id -> deteleUser");
    next();
  }, authenticateJWT, deleteUser);

export default route;
