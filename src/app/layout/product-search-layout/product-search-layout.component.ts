import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-product-search-layout',
  imports: [NgFor, RouterOutlet],
  templateUrl: './product-search-layout.component.html',
  styleUrl: './product-search-layout.component.css'
})
export class ProductSearchLayoutComponent {
  
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
    { label: 'New Releases', url: '/gp/new-releases/' }
  ];

  constructor(){}
    


}
