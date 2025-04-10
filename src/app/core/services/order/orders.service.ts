import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ORDERS_API = 'your url for Updating the orders'; //  Base url for Updating Users Orders List
  private ordersSubject = new BehaviorSubject<{ productId: number, quantity: number }[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {
    this.initializeOrders();
  }

  private initializeOrders(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.orders) {
      this.ordersSubject.next(user.orders);
    }
  }

  getOrders(): Observable<{ productId: number, quantity: number }[]> {
    return this.ordersSubject.asObservable();
  }

  updateOrders(newOrders: { productId: number, quantity: number }[]): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const existingOrders = user.orders || [];

    const mergedOrders = [...existingOrders, ...newOrders];
    user.orders = mergedOrders;
    user.cart = [];

    this.ordersSubject.next(mergedOrders);

    this.http.put(`${this.ORDERS_API}${user.id}`, user).subscribe({
      next: () => console.log('Orders synced to backend'),
      error: (err) => console.error('Failed to update orders:', err)
    });

    this.authService.setCurrentUser(user);
  }
}
