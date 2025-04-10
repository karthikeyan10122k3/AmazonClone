import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartItem } from '../../core/models/cart/cart-item';
import { CartCardComponent } from "../../shared/components/cart-card/cart-card.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { ProductsService } from '../../core/services/product/products.service';
import { OrdersService } from '../../core/services/order/orders.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-display',
  imports: [NgFor, NgIf, CartCardComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: CartItem[];
  subtotal!: number;
  totalCartItems!: number;
  orders!: { productId: number; quantity: number }[];
  orderedProducts!: any[];



  constructor(private cartService: CartService, 
    private authService: AuthService, 
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {
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

    this.productService.getProducts().subscribe(productList => {
      this.ordersService.getOrders().subscribe(orderList => {
        this.orders = orderList;
    
        const productMap = new Map<number, any>();
    
        orderList.forEach(order => {
          const product = productList.find(p => p.id === order.productId);
          if (product) {
            if (productMap.has(order.productId)) {
              // If product already exists, increase the quantity
              const existing = productMap.get(order.productId);
              existing.quantity += order.quantity;
            } else {
              // Clone product with quantity
              productMap.set(order.productId, {
                ...product,
                quantity: order.quantity
              });
            }
          }
        });
    
        // Final ordered products list
        this.orderedProducts = Array.from(productMap.values());
      });
    });
    
  }


  proceedToBuy() {
    const confirmBuy = confirm("Are you sure you want to buy the products mentioned in the cart?");
    if (!confirmBuy) return;

    const user = this.authService.getCurrentUser();
    if (!user) return;
    
    // Update product stock
    this.productService.getProducts().subscribe(productList => {
      this.cartItems.forEach(cartItem => {
        const product = productList.find(prod => prod.id === cartItem.id);
        if (product) {
          product.stock -= cartItem.quantity;
          if (product.stock < 0) product.stock = 0; 
        }
      });

      // Update user orders
      user.orders = [
        ...(user.orders || []), 
        ...this.cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      ];

      const ordersToAdd = this.cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
      
      this.ordersService.updateOrders(ordersToAdd);
      // Clear cart
      this.cartItems = [];
      this.cartService.clearCart();
      this.authService.setCurrentUser(user);

      // Backend sync for user and products
      this.cartService.syncUser(user);
      this.productService.syncProducts(productList);

      
    });
  }
}
