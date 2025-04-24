import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartItem } from '../../../core/models/cart/cart-item';
import { CartService } from '../../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product/product';

@Component({
  selector: 'app-cart-card',
  imports: [CurrencyPipe, NgIf,RouterLink],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css'
})
export class CartCardComponent  {
  @Input() cartItem!: CartItem;

  constructor(private cartService: CartService){

  }
  ngOnInit() {
    // console.log('Cart Item:', this.cartItem);
  }

  increaseQuantity(product: CartItem) {
    this.cartService.increaseQuantity(product);
    this.cartService.updateSubtotal();
  }

  decreaseQuantity(product: CartItem) {
    this.cartService.decreaseQuantity(product);
    this.cartService.updateSubtotal();
  }

  deleteItem(product: any) {
    this.cartService.removeItem(product);
    this.cartService.updateSubtotal();
  }
}
