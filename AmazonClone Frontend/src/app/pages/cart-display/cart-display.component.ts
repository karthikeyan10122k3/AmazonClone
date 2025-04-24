import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { CartItem } from '../../core/models/cart/cart-item';
import { CartCardComponent } from "../../shared/components/cart-card/cart-card.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { ProductsService } from '../../core/services/product/products.service';
import { OrdersService } from '../../core/services/order/orders.service';
import { RouterLink } from '@angular/router';
import { Orders } from '../../core/models/order-item/orders';

@Component({
  selector: 'app-cart-display',
  imports: [NgFor, NgIf, CartCardComponent, CurrencyPipe, RouterLink],
  templateUrl: './cart-display.component.html',
  styleUrls: ['./cart-display.component.css']
})
export class CartComponent implements OnInit {

  cartItems!: CartItem[];
  cartLength: number = 0;
  subtotal!: number;
  totalCartItems!: number;
  orders!: { productId: string; quantity: number }[];
  orderItems!: Orders[];
  ordersLength: number = 0;

  constructor(private cartService: CartService, 
    private authService: AuthService, 
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(result => {
      
      this.cartItems = result;
      
      this.cartLength = this.cartItems.length;
      this.cartService.updateSubtotal();
    });
    
    this.ordersService.getOrderItems().subscribe(result => {
      
      this.orderItems = result;
      
      this.ordersLength = this.orderItems.length;
    });
  
    this.cartService.getSubtotal().subscribe(subtotal => {
      this.subtotal = subtotal;
    });
  
    this.cartService.getTotalItemsObservable().subscribe(total => {
      this.totalCartItems = total;
    });

  }


  proceedToBuy() {
    const confirmBuy = confirm("Are you sure you want to buy the products mentioned in the cart?");
    if (!confirmBuy) return;

    const user = this.authService.getUser();
    if (!user) return;
    
      const ordersToAdd = this.cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity
      }));

      this.ordersService.addOrderItems(ordersToAdd);
      // Clear cart
      this.cartItems = [];
      this.cartService.clearCart();

      // this.productService.syncProducts(productList);
 
  }

  buyAgain(buyingProduct : any) {
    const confirmBuy = confirm("Are you sure you want to buy this product?");
    if (!confirmBuy) return;
  
    const user = this.authService.getUser();
    if (!user) {
      return;
    }
  
    const orderedProduct: Orders = {
      product: {
        id: buyingProduct.id,
        title: buyingProduct.title,
        description: buyingProduct.description,
        price: buyingProduct.price,
        stock: buyingProduct.stock,
        discountPercentage: buyingProduct.discountPercentage || 0,
        rating: buyingProduct.rating,
        availabilityStatus: buyingProduct.availabilityStatus,
        minimumOrderQuantity: buyingProduct.minimumOrderQuantity,
        thumbnail: buyingProduct.thumbnail,
      },
      quantity: 1
    };
  
    this.ordersService.addSingleOrderItem(orderedProduct);
  }
}
