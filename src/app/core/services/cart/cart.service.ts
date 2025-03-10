import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product/product';
import { CartItem } from '../../models/cart/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    cartList: CartItem[] = [
      {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
        quantity: 1,
        price: 9.99,
        stock:5,
        discountPercentage: 7.17,
        rating: 4.94,
        availabilityStatus: "Low Stock",
        minimumOrderQuantity: 24,
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
      },
      {
        id: 2,
        title: "Eyeshadow Palette with Mirror",
        description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        quantity: 1,
        price: 19.99,
        stock:44,
        discountPercentage: 5.5,
        rating: 3.28,
        availabilityStatus: "In Stock",
        minimumOrderQuantity: 32,
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png"
      },
      {
        id: 3,
        title: "Powder Canister",
        description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
        quantity: 1,
        price: 14.99,
        stock:59,
        discountPercentage: 18.14,
        rating: 3.82,
        availabilityStatus: "In Stock",
        minimumOrderQuantity: 25,
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
      },
      {
        id: 4,
        title: "Red Lipstick",
        description: "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        quantity: 1,
        price: 12.99,
        stock:68,
        discountPercentage: 19.03,
        rating: 2.51,
        availabilityStatus: "In Stock",
        minimumOrderQuantity: 6,
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png"
      },
      {
        id: 5,
        title: "Red Nail Polish",
        description: "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
        quantity: 1,
        price: 8.99,
        stock:79,
        discountPercentage: 2.46,
        rating: 3.91,
        availabilityStatus: "In Stock",
        minimumOrderQuantity: 46,
        thumbnail: "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png"
      }
    ];

    // BehaviorSubjects
  cartBehaviourSubject = new BehaviorSubject<CartItem[]>(this.cartList);
  subtotalBehaviourSubject = new BehaviorSubject<number>(0);
  totalItemsSubject = new BehaviorSubject<number>(this.getTotalItems());

  
  // Returning CartList
  getCartItems(): Observable<CartItem[]>  {
    return this.cartBehaviourSubject.asObservable()
  }
// Adding Item in cart
  addItem(product: any) {
  console.log("In Add Item Service!");

    const index = this.cartList.findIndex(item => item.id === product.id); 

    if (index > -1) {
      console.error("Item already in Cart");
      return;
    }
    const cartProduct: CartItem = {
      id: product.id,
        title: product.title,
        description: product.description,
        stock: product.stock,
        quantity: 1,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        availabilityStatus: product.availabilityStatus,
        minimumOrderQuantity: product.minimumOrderQuantity,
        thumbnail: product.thumbnail
    }

    this.cartList.push(cartProduct);
    this.cartBehaviourSubject.next([...this.cartList]); 
  }

  // Removing Items From Cart
  removeItem(cartItem: any) {
    const index = this.cartList.findIndex(item => item.id === cartItem.id);

    if (index < 0) {
      console.error("Item Not in Cart");
      return;
    }

    this.cartList.splice(index, 1);
    this.cartBehaviourSubject.next([...this.cartList]); 
  }

  // Counting Total Number of items in cart
  getTotalItems(): number {
    return this.cartBehaviourSubject.getValue().length;
  }
  // Returing  as Observable to the components the total count of items in cart
  getTotalItemsObservable(): Observable<number> {
    return this.totalItemsSubject.asObservable();
  }
  // Updating Total Count of Items in cart
  updateTotalItems() {
    this.totalItemsSubject.next(this.getTotalItems());
  }

  // Calculating the total Prize for items in Cart
  calculateTotalPrice(): number {
    return this.cartBehaviourSubject.getValue().reduce((total, product) => {
      return total + (product.price * (product.quantity || 1)); 
    }, 0);
  }
  
  // Increasing Quantity of Item in cart
  increaseQuantity(cartItem: CartItem) {
    const item = this.cartList.find(prod => prod.id === cartItem.id);
  
    if (!item) {
      console.error("Item Not available to increase quantity");
      return;
    }
  
    if (item.quantity >= item.stock) {
      console.warn("Stock limit reached, cannot increase further.");
      return;
    }
    if (item.quantity >= item.minimumOrderQuantity) {
      console.warn("Minimum Order Quantity limit reached, cannot increase further.");
      return;
    }
  
    item.quantity = (item.quantity || 1) + 1;
    this.cartBehaviourSubject.next([...this.cartList]);
    this.updateSubtotal();
  }
  
  // Decreasing Quantity of Item in cart
  decreaseQuantity(cartItem: CartItem) {
    const item = this.cartList.find(prod => prod.id === cartItem.id);
  
    if (!item) {
      console.error("Item Not available to decrease quantity");
      return;
    }
  
    if (item.quantity <= 1) {
      console.warn("Minimum order limit reached, cannot decrease further.");
      return;
    }
  
    item.quantity--;
    this.cartBehaviourSubject.next([...this.cartList]);
    this.updateSubtotal();
  }
  

  // Updating Total Price of items in cart
  updateSubtotal() {
    const subTotal = this.calculateTotalPrice();
    this.subtotalBehaviourSubject.next(subTotal); 
  }

  // Returning the Total Prize of items in cart
  getSubtotal(): Observable<number> {
    return this.subtotalBehaviourSubject.asObservable();
  }

  // checking if Item Present in Cart or not
  findItem(cartItem: Product): Boolean{
    const isItemPresent = this.cartList.find(prod => prod.id === cartItem.id);

    return isItemPresent? true : false ;
  }
  
  

}
