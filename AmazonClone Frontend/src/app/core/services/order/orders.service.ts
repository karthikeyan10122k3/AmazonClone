import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Orders } from '../../models/order-item/orders';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  private BASE_URL = 'http://localhost:8080/api/user';
  private ordersBehaviorSubject = new BehaviorSubject<Orders[]>([]);
  private ordersList: Orders[] = [{
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
  }]

  constructor(private authService: AuthService, private http: HttpClient) {
    this.getUserOrdersFromDB();
  }

  addOrderItems(buyProducts: Orders[]) {
  
    buyProducts.forEach(newItem => {
      const index = this.ordersList.findIndex(
        existingItem => existingItem.product.id === newItem.product.id
      );
  
      if (index > -1) {
        this.ordersList[index].quantity += newItem.quantity;
      } else {
        this.ordersList.push({ ...newItem });
      }
    });
  
    this.updateUserOrders();
  }

  addSingleOrderItem(buyingProduct: Orders) {
    const index = this.ordersList.findIndex(item => item.product.id === buyingProduct.product.id);
    

    if (index > -1) {
      this.ordersList[index].quantity += buyingProduct.quantity;
    } else {
      this.ordersList.push({ ...buyingProduct });
    }

    this.updateUserOrders();
  }
  

  getUserOrdersFromDB() {
    const user = this.authService.getUser();
    if (!user) return [];

    this.http.get<any>(`${this.BASE_URL}/orders?contact=${user.contact}`).subscribe({
      next: (response) => {
        this.ordersList = response.orders;
      
        this.ordersBehaviorSubject.next([...this.ordersList]);
      },
      error: (err) => console.error('Failed to retrieve user cart:', err)
    });

    return this.ordersList; 
  }

  getOrderItems(): Observable<Orders[]> {
    return this.ordersBehaviorSubject.asObservable();
  }

  updateUserOrders() {
    const user = this.authService.getUser();
    if (!user) return;

    const updatedOrdersPayload = {
      contact: user.contact,
      orders: this.ordersList
    };
  
    this.http.put(`${this.BASE_URL}/update-orders`, updatedOrdersPayload)
    .subscribe({
      next: () => {
        console.log('User Orders synced with backend')
        this.ordersBehaviorSubject.next([...this.ordersList]);
      
      },
      error: (err) => console.error('Failed to update user on backend:', err)
    });

  }
  
}
