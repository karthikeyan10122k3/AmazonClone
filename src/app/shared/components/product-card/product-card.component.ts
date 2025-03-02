import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product/product';
import { CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductDescriptionShorteningPipe } from '../../pipes/productDescriptionShortening/product-description-shortening.pipe';

@Component({
  selector: 'app-product-card',
  imports: [NgIf, CurrencyPipe, RouterLink, ProductDescriptionShorteningPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  category = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ]
  
horizontalCardCategory = ["smartphones", "laptops","automotive", "motorcycle", "home-decoration", "furniture", "lighting"];

 constructor() {}

 isHorizontalCardCategory(category: string): boolean {
   return this.horizontalCardCategory.includes(category);
 }

}
