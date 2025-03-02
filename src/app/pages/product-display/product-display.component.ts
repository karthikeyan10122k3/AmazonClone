import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Product } from '../../core/models/product/product';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-display',
  imports: [ProductCardComponent, NgFor, NgIf, FormsModule],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css'
})
export class ProductDisplayComponent {
  productList: Product[] = [];
  filteredProductList: Product[] = [];
  searchedProduct: string = '';
  category: string = '';

  filters = {
    price: '',
    discount: '',
    availability: '',
    rating: '',
    shipping: '',
    return: '',
    warranty: '',
    minOrder: ''
  };

  productService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  route = inject(Router);

  constructor() {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(query => {
      this.searchedProduct = query['s'] || ''; 
      this.category = query['c'] || '';

      if (!this.searchedProduct) {
        this.route.navigate(['/home']);
      }

      this.productService.getProducts().subscribe(result => {
        this.productList = result;
        this.getSearchedProducts(); 
      });
    });
  }

  horizontalCardCategory = [
    "smartphones", "laptops", "automotive", 
    "motorcycle", "home-decoration", "furniture", "lighting"
  ];
  isHorizontalCardCategory(category: string): boolean {
    return this.horizontalCardCategory.includes(category);
  }

  getSearchedProducts() {
    if(this.category.includes("All")){
      this.filteredProductList = this.productList.filter(product => 
        product.title.toLowerCase().includes(this.searchedProduct.toLowerCase())
      );
    }
      this.filteredProductList = this.productList.filter(product => 
        product.title.toLowerCase().includes(this.searchedProduct.toLowerCase()) &&
        (this.category ? product.category === this.category : true)
      );
  }



  resetFilters() {
    this.filters = {
      price: '',
      discount: '',
      availability: '',
      rating: '',
      shipping: '',
      return: '',
      warranty: '',
      minOrder: ''
    };
  }
}


