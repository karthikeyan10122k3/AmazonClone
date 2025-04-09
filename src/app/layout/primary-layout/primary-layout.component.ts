import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-primary-layout',
  imports: [NgFor, NgIf, RouterOutlet, FormsModule, RouterLink],
  templateUrl: './primary-layout.component.html',
  styleUrl: './primary-layout.component.css'
})
export class PrimaryLayoutComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService)
  category!: string ; 
  searchInput!: string ;
  username: string | undefined = '';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(query=>{
      this.category = query['category'] || 'All'
      this.searchInput = query['search'] || ''
    })
  }

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
    "All",
    "Beauty",
    "Fragrances",
    "Furniture",
    "Groceries",
    "smartphones",
    "laptops",
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


  searchProduct() {
    if (this.searchInput.trim() || this.category.trim()) { 
      this.router.navigate(["/search"], {
        queryParams: { category: this.category, search: this.searchInput}
      });
    }
  }

  checkUser() {
    const currentUser = this.authService.getCurrentUser();
    if(currentUser !== null){
      this.username = currentUser?.fullName
      return true;
    }else{
      return false;
    }
  }

  logoutUser(){
    this.authService.logout();
  }
  
}
