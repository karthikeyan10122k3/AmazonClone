export interface User {
    id?: number;
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
  