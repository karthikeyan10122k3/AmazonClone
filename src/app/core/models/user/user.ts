export interface User {
    fullName: string;
    email: string;
    mobile: string;
    password: string;
  
    cart?: {
      productId: number;
      quantity: number;
    }[];
  
    orders?: {
      productId: number;
      quantity: number;
    }[];
  }
  