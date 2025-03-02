import { CurrencyPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { Product } from '../../core/models/product/product';

@Component({
  selector: 'app-product-details',
  imports: [NgFor, NgClass, CurrencyPipe, DatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  
  constructor(){
    this.product = {
      id: 0,
      thumbnail:'',
      title: '',
      brand: '',
      sku: '',
      price: 0,
      discountPercentage: 0,
      availabilityStatus: '',
      stock: 0,
      rating: 0,
      category: '',
      tags: [],
      description: '',
      weight: 0,
      dimensions: { width: 0, height: 0, depth: 0 },
      warrantyInformation: '',
      shippingInformation: '',
      returnPolicy: '',
      minimumOrderQuantity: 1,
      meta: {createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
      images: [],
      reviews: []
    };
  }
  

  activatedRouter = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);

  ngOnInit() {
    const productId = Number(this.activatedRouter.snapshot.paramMap.get("id"));

    if (isNaN(productId) || productId <= 0) { 
      console.log("isNan or prodId < 10");
      
      this.router.navigate(["/home"]);
      return;
    }
    this.productService.getSingleProduct(productId).subscribe({
      next: (result) => {
        if (!result) { 
          console.log("Product not found. Redirecting to home...");
          this.router.navigate(["/home"]); 
          return; 
        }
        this.product = result;
      }
    }
    );
        
  }
  
}
