import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product/product';
import { CartItem } from '../../models/cart/cart-item';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartList: CartItem[] = [{
    product: {
      id: "",
      title: "",
      description: "",
      price: 0,
      stock: 0,
      discountPercentage: 0,
      rating: 0,
      availabilityStatus: "",
      minimumOrderQuantity: 0,
      thumbnail: "",
},
    quantity: 0
  }];

  private BASE_URL = 'http://localhost:8080/api/user';

  cartBehaviourSubject = new BehaviorSubject<CartItem[]>([]);
  subtotalBehaviourSubject = new BehaviorSubject<number>(0);
  totalItemsSubject = new BehaviorSubject<number>(this.getTotalItems());

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getUserCartFromDB(); 
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartBehaviourSubject.asObservable();
  }

  addItem(product: any) {
    const index = this.cartList.findIndex(item => item.product.id === product.id);

    if (index > -1) {
      // console.error("Item already in Cart");
      return;
    }
    
    const cartProduct: CartItem = {
      product: {
        id: product.id,
        title: product.title,
        description: product.description,
        stock: product.stock,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        availabilityStatus: product.availabilityStatus,
        minimumOrderQuantity: product.minimumOrderQuantity,
        thumbnail: product.thumbnail
      },
      quantity: 1
    };
    this.cartList.push(cartProduct);
    this.updateUserCart();
  }

  removeItem(cartItem: any) {
    const index = this.cartList.findIndex(item => item.product.id === cartItem.id);
    if (index < 0) {
      // console.error("Item Not in Cart");
      return;
    }
    

    this.cartList.splice(index, 1);
    this.updateUserCart();
  }

  getTotalItems(): number {
    return this.cartBehaviourSubject.getValue().length;
  }

  getTotalItemsObservable(): Observable<number> {
    return this.totalItemsSubject.asObservable();
  }

  updateTotalItems() {
    this.totalItemsSubject.next(this.getTotalItems());
  }

  calculateTotalPrice(): number {
    return this.cartBehaviourSubject.getValue().reduce((total, item) => {
      return total + (item.product.price * (item.quantity || 1));
    }, 0);
  }

  increaseQuantity(cartItem: CartItem) {
    const item = this.cartList.find(item => item.product.id=== cartItem.product.id);
    if (!item) {
      // console.error("Item Not available to increase quantity");
      return;
    }

    if (item.quantity >= item.product.stock || item.quantity >= item.product.minimumOrderQuantity) {
      // console.warn("Limit reached, cannot increase further.");
      return;
    }

    item.quantity = (item.quantity || 1) + 1;
    this.updateSubtotal();
    this.updateUserCart();
  }

  decreaseQuantity(cartItem: CartItem) {
    const item = this.cartList.find(prod => prod.product.id === cartItem.product.id);
    if (!item || item.quantity <= 1) {
      // console.warn("Minimum order limit reached, cannot decrease further.");
      return;
    }

    item.quantity--;
    this.updateSubtotal();
    this.updateUserCart();
  }

  updateSubtotal() {
    const subTotal = this.calculateTotalPrice();
    this.subtotalBehaviourSubject.next(subTotal);
  }

  getSubtotal(): Observable<number> {
    return this.subtotalBehaviourSubject.asObservable();
  }

  findItem(cartItem: Product): Boolean {
    const isItemPresent = this.cartList.find(prod => prod.product.id === cartItem.id);
    return !!isItemPresent;
  }

  updateUserCart() {
    const user = this.authService.getUser();
    
    if (!user) return;
  const updatedCartPayload = {
    contact: user.contact,
    cart: this.cartList
    };
    
    this.http.put(`${this.BASE_URL}/update-cart`, updatedCartPayload)
    .subscribe({
      next: () =>{ 
        // console.log('User cart synced with backend')
        this.cartBehaviourSubject.next([...this.cartList]);

      },
      error: (err) => console.error('Failed to update user on backend:', err)
    });

  }

  getUserCartFromDB() {
    const user = this.authService.getUser();
    if (!user) return [];

    this.http.get<any>(`${this.BASE_URL}/cart?contact=${user.contact}`)
    .subscribe({
      next: (response) => {
        // console.log('User cart retrieved from backend:', response);
        this.cartList = response.cart;
      
        this.cartBehaviourSubject.next([...this.cartList]);
      },
      error: (err) => console.error('Failed to retrieve user cart:', err)
    });

    return this.cartList; 
  }



  clearCart() {
    this.cartList = [];
    this.cartBehaviourSubject.next([]);
    this.updateSubtotal();
    this.updateTotalItems();
    this.updateUserCart();
  }
}
