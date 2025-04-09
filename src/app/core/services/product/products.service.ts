import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product/product';
import { tap, take, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private PRODUCT_API = 'https://dummyjson.com/products';
  private products = new BehaviorSubject<Product[]>([]);
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this. fetchProducts()
  }

  fetchProducts(): void {
    if(this.products.getValue().length === 0){
      this.http.get<{ products: Product[] }>(this.PRODUCT_API)
        .subscribe({
          next: (result) => {
            this.products.next(result.products); 
          },
          error: (error) => {
            console.error("Error fetching products:", error); 
          }
        });
    }
  }


  getProducts() {
    return this.products.asObservable()
  }

  getSingleProduct(productId: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      filter(products => products.length > 0),
      take(1),
      switchMap(products => {
        const singleProduct = products.find(prod => prod.id === productId);
        if (!singleProduct) {
          console.warn(`Product with Id ${productId} not available`);
          this.router.navigate(["/home"]);
          return of(undefined);
        }
        return of(singleProduct);
      })
    );
  }

  syncProducts(updatedList: Product[]) {
    updatedList.forEach(product => {
      this.http.put(`Add your product update URL/${product.id}`, product).subscribe({
        next: () => console.log(`Product ${product.id} stock updated`),
        error: (err) => console.error(`Error updating product ${product.id}:`, err)
      });
    });
  }
  
}
