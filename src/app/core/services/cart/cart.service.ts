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

  private cartList: CartItem[] = [];

  cartBehaviourSubject = new BehaviorSubject<CartItem[]>(this.cartList);
  subtotalBehaviourSubject = new BehaviorSubject<number>(0);
  totalItemsSubject = new BehaviorSubject<number>(this.getTotalItems());

  constructor(private authService: AuthService, private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartBehaviourSubject.asObservable();
  }

  addItem(product: any) {
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
    };

    this.cartList.push(cartProduct);
    this.cartBehaviourSubject.next([...this.cartList]);
    this.updateUserCart();
  }

  removeItem(cartItem: any) {
    const index = this.cartList.findIndex(item => item.id === cartItem.id);

    if (index < 0) {
      console.error("Item Not in Cart");
      return;
    }

    this.cartList.splice(index, 1);
    this.cartBehaviourSubject.next([...this.cartList]);
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
    return this.cartBehaviourSubject.getValue().reduce((total, product) => {
      return total + (product.price * (product.quantity || 1));
    }, 0);
  }

  increaseQuantity(cartItem: CartItem) {
    const item = this.cartList.find(prod => prod.id === cartItem.id);

    if (!item) {
      console.error("Item Not available to increase quantity");
      return;
    }

    if (item.quantity >= item.stock || item.quantity >= item.minimumOrderQuantity) {
      console.warn("Limit reached, cannot increase further.");
      return;
    }

    item.quantity = (item.quantity || 1) + 1;
    this.cartBehaviourSubject.next([...this.cartList]);
    this.updateSubtotal();
    this.updateUserCart();
  }

  decreaseQuantity(cartItem: CartItem) {
    const item = this.cartList.find(prod => prod.id === cartItem.id);

    if (!item || item.quantity <= 1) {
      console.warn("Minimum order limit reached, cannot decrease further.");
      return;
    }

    item.quantity--;
    this.cartBehaviourSubject.next([...this.cartList]);
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
    const isItemPresent = this.cartList.find(prod => prod.id === cartItem.id);
    return isItemPresent ? true : false;
  }

  updateUserCart() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    user.cart = this.cartList.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    this.authService.setCurrentUser(user);

    this.http.put(`Add your url for updating user`, user).subscribe({
      next: () => console.log('User cart synced with backend'),
      error: (err) => console.error('Failed to update user on backend:', err)
    });
  }

  clearCart() {
    this.cartList = [];
    this.cartBehaviourSubject.next([]);
    this.updateSubtotal();
    this.updateTotalItems();
    this.updateUserCart();
  }
  
  syncUser(user: any) {
    this.http.put('Add your url for updating user', user).subscribe({
      next: () => console.log('User updated after purchase'),
      error: (err) => console.error('Failed to sync user after purchase:', err)
    });
  }
  

}
