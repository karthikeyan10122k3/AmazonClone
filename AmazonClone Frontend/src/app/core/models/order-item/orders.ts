export interface Orders {
    product: Item;
    quantity: number;
}

interface Item {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    discountPercentage: number;
    rating: number;
    availabilityStatus: string;
    minimumOrderQuantity: number;
    thumbnail: string;
}
