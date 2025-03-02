import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-primary-layout',
  imports: [NgFor, RouterOutlet, FormsModule, RouterLink],
  templateUrl: './primary-layout.component.html',
  styleUrl: './primary-layout.component.css'
})
export class PrimaryLayoutComponent {
  category: string = "All"; 
  searchInput: string = "";

  navLinks = [
    { label: 'Fresh', url: '/fresh' },
    { label: 'MX Player', url: '/minitv' },
    { label: 'Sell', url: '/b/32702023031' },
    { label: 'Best Sellers', url: '/gp/bestsellers/' },
    { label: 'Mobiles', url: '/mobile-phones/b/' },
    { label: "Today's Deals", url: '/deals' },
    { label: 'Customer Service', url: '/gp/help/customer/display.html' },
    { label: 'Electronics', url: '/electronics/b/' },
    { label: 'Amazon Pay', url: '/gp/sva/dashboard' },
    { label: 'New Releases', url: '/gp/new-releases/' },
    { label: 'Home & Kitchen', url: '/gp/h&k/' },
    { label: 'Computers', url: '/gp/computers/' },
    { label: 'Fashion', url: '/gp/fashion/' },
    { label: 'Books', url: '/gp/books/' }
  ];

  categoryList = [
    "beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "home-decoration",
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
  ];

  router = inject(Router);

  searchProduct() {
    if (this.searchInput.trim()) { 
      this.router.navigate(["/search"], {
        queryParams: { c: this.category, s: this.searchInput.trim() }
      });
    }
  }
}
