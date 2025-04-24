import express from 'express';
import { login, signUp } from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/login',login);
route.post('/register',signUp);


export default route;