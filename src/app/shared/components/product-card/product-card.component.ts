import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/product/product';
import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ProductDescriptionShorteningPipe } from '../../../core/pipes/productDescriptionShortening/product-description-shortening.pipe';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, NgIf, CurrencyPipe, RouterLink, ProductDescriptionShorteningPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  isInCart: boolean = false;
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
  
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(prod => {
      this.isInCart = prod.some(item => item.id === this.product.id);
    });
  }
  
  isHorizontalCardCategory(category: string): boolean {
    return this.horizontalCardCategory.includes(category);
  }

  addItemToCart(product: Product){
    this.cartService.addItem(product)
  }

  removeItemFromCart(product: Product){
    this.cartService.removeItem(product)
  }


}
