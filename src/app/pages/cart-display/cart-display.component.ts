import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartItem } from '../../core/models/cart/cart-item';
import { CartCardComponent } from "../../shared/components/cart-card/cart-card.component";

@Component({
  selector: 'app-cart-display',
  imports: [NgFor, CartCardComponent, CurrencyPipe],
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: CartItem[];
  subtotal!: number;
  totalCartItems!: number;

  constructor(private cartService: CartService) {
    // this.cartItems = [];
    // this.subtotal = 0;
    // this.totalCartItems = 0;
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(result => {
      this.cartItems = result;
      this.cartService.updateSubtotal();
    });
  
    this.cartService.getSubtotal().subscribe(subtotal => {
      this.subtotal = subtotal;
    });
  
    this.cartService.getTotalItemsObservable().subscribe(total => {
      this.totalCartItems = total;
    });
  }
  
  



  
}
