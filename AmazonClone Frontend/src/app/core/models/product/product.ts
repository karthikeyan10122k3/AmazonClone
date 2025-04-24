import { Dimensions } from "./dimensions";
import { Meta } from "./meta";
import { Review } from "./review";

export interface Product {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    tags?: string[];
    brand?: string;
    sku?: string;
    weight?: number;
    dimensions?: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews?: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta?: Meta;
    thumbnail: string;
    images?: string[];
  }

  