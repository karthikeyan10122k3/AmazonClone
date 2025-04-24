import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BASE_URL = 'http://localhost:8080/api/product';
  private productBehaviourSubject = new BehaviorSubject<Product[]>([]);
  private http = inject(HttpClient);
  private productList: Product[] = [{
    id: '',
    title: '',
    description: '',
    category: '',
    price: 0,
    rating: 0,
    stock: 0,
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    returnPolicy: '',
    minimumOrderQuantity: 0,
    thumbnail: ''
  }]

  constructor() {
    this. fetchProducts()
  }

  fetchProducts(): void {
    if (this.productBehaviourSubject.getValue().length === 0) {
      this.http.get<{ products: any[] }>(this.BASE_URL).subscribe({
        next: (result) => {
          this.productList = result.products.map(product => {
            const { _id, ...rest } = product;
            return { ...rest, id: _id };
          });
  
          this.productBehaviourSubject.next([...this.productList]);
        },
        error: (error) => {
          console.error("Error fetching products:", error);
        }
      });
    }
  }
  


  getProducts() {
    return this.productBehaviourSubject.asObservable()
  }
  

  getSingleProduct(productId: string): Observable<Product> {
    return this.http.get<{ message: string, product: any }>(`${this.BASE_URL}/${productId}`)
      .pipe(
        map(response => {
          const product = response.product;
          const { _id, ...rest } = product;
          const productObject =  { ...rest, id: _id };
          
          return productObject as Product;
        })
      );
  }
  
  syncProducts(updatedList: Product[]) {
    // console.log(updatedList);
    
  }
  
  
}
