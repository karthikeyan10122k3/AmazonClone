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
    this.productService.getProducts().subscribe(result => {
      this.productList = result;
  
      this.activatedRoute.queryParams.subscribe(query => {
        this.searchedProduct = query['search'] || ''; 
        this.category = query['category'] || '';
        this.getSearchedProducts(); 
      });
    });
    
  }
  

  getSearchedProducts() {
    if(this.searchedProduct === "" && this.category === "All"){
      this.route.navigate(["/home"]);
    }
    if(this.searchedProduct === "" && this.category !== "All"){ // No Search Product But There is Category!
      this.filteredProductList = this.productList.filter(product => 
        product.category.trim().toLowerCase() === this.category.trim().toLowerCase());
    }
    else if(this.searchedProduct && this.category === "All"){  // There is Search Product But  No Category!
      this.filteredProductList = this.productList.filter(product => 
        product.title.trim().toLowerCase().includes(this.searchedProduct.trim().toLowerCase())
      );
    }
    else if(this.searchedProduct && this.category !== "All"){  // There is Search Product and Category!
      this.filteredProductList = this.productList.filter(product => 
        (product.title.trim().toLowerCase().includes(this.searchedProduct.trim().toLowerCase())) &&
        (product.category.trim().toLowerCase() === this.category.trim().toLowerCase())
      );
    }
    
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

  horizontalCardCategory = [
    "smartphones", "laptops", "automotive", 
    "motorcycle", "home-decoration", "furniture", "lighting"
  ];
  isHorizontalCardCategory(category: string): boolean {
    return this.horizontalCardCategory.includes(category);
  }
}


