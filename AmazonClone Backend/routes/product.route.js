import express from 'express';
import { addProduct, editProduct, getAllProducts, getProduct } from '../controllers/product.controller.js';

const route = express.Router();

route.get('/',getAllProducts);
route.get('/:id',getProduct);
// route.put('/:id',editProduct);
// route.post('/',addProduct);


export default route;