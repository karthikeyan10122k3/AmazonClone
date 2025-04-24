import { CartItem } from "../cart/cart-item";
import { Product } from "../product/product";

export interface User {
    id?: string;
    fullName: string;
    email?: string;
    mobile: string;
    password?: string;
  
    cart?: {
      product: CartItem;
      quantity: number;
    }[];
  
    orders?: {
      product: CartItem;
      quantity: number;
    }[];
  }
  