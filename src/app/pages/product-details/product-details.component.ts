import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../core/services/product/products.service';
import { Product } from '../../core/models/product/product';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { OrdersService } from '../../core/services/order/orders.service';
import { Orders } from './../../core/models/order-item/orders';

@Component({
  standalone: true,
  selector: 'app-product-details',
  imports: [NgFor, NgIf, NgClass, CurrencyPipe, DatePipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  showLoginModal: boolean = false;
  pendingProductToAdd: Product | null = null;
  isInCart: boolean = false;
  productId: string | null = '';

  product: Product = {
    id: '',
    thumbnail: '',
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
    meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
    images: [],
    reviews: []
  };

  activatedRouter = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductsService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  orderService = inject(OrdersService);

  ngOnInit() {
    this.productId = this.activatedRouter.snapshot.paramMap.get("id");
  
    if (!this.productId) return;
  
    this.productService.getSingleProduct(this.productId).subscribe({
      next: (result) => {
        this.product = result;
  
        this.cartService.getCartItems().subscribe(cartItems => {
          this.isInCart = cartItems.some(item => item.product.id === this.product.id);
        });
      },
      error: (err) => {
        console.error('Error loading product:', err);
      }
    });
  }
  
  

  openLoginModal(product: Product) {
    this.pendingProductToAdd = product;
    this.showLoginModal = true;
  }

  closeLoginModal() {
    this.showLoginModal = false;
    this.pendingProductToAdd = null;
  }

  proceedToLogin() {
    this.showLoginModal = false;
    this.router.navigate(['/login']);
  }

  addItemToCart() {
    const user = this.authService.getUser();
    if (!user) {
      this.openLoginModal(this.product);
      return;
    }

    this.cartService.addItem(this.product);
  }

  removeItemFromCart() {
    this.cartService.removeItem(this.product);
  }

  proceedToBuy() {
    const confirmBuy = confirm("Are you sure you want to buy this product?");
    if (!confirmBuy) return;
  
    const user = this.authService.getUser();
    if (!user) {
      this.openLoginModal(this.product);
      return;
    }
  
    const orderedProduct: Orders = {
      product: {
        id: this.product.id,
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        stock: this.product.stock,
        discountPercentage: this.product.discountPercentage || 0,
        rating: this.product.rating,
        availabilityStatus: this.product.availabilityStatus,
        minimumOrderQuantity: this.product.minimumOrderQuantity,
        thumbnail: this.product.thumbnail,
      },
      quantity: 1
    };
  
    this.orderService.addSingleOrderItem(orderedProduct);
  }
  

}
