import mongoose from "mongoose";
import { ProductSchema } from './product.model.js';

const ItemSchema = mongoose.Schema( {
    id: String,
    title: String,
    description: String,
    price: Number,
    stock: Number,
    discountPercentage: Number,
    rating: Number,
    availabilityStatus: String,
    minimumOrderQuantity: Number,
    thumbnail: String,
}, { _id: false })

const CartSchema = mongoose.Schema( {
    product: ItemSchema,
    quantity: Number,
}, { _id: false })
  

const OrderSchema = mongoose.Schema({
    product: ItemSchema,
    quantity: Number,
}, { _id: false })

const UserSchema = mongoose.Schema({
    fullName: {
        type: String, required: true
    },
    email: { type: String, unique: true },
    mobile: { type: String, unique: true },
    password: {
        type: String, required: true
    },
    cart: [CartSchema],
    orders: [OrderSchema],
},
{
    timestamp: true,
})

const UserModel = mongoose.model('users',UserSchema);

export default UserModel;