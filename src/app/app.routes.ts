import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDisplayComponent } from './pages/product-display/product-display.component';
import { PrimaryLayoutComponent } from './layout/primary-layout/primary-layout.component';
import { ProductSearchLayoutComponent } from './layout/product-search-layout/product-search-layout.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    // {
    //     path:"home",
    //     component:PrimaryLayoutComponent
    // }    
    {
        path:"home",
        component:PrimaryLayoutComponent ,
        children:[
            {
                path:"",
                component:HomePageComponent,
            }
        ]
    },
    {
        path:"search",
        // component:ProductSearchLayoutComponent,
        component:PrimaryLayoutComponent,
        children:[
            {
                path:"",
                component:ProductDisplayComponent
            }   
    ]
    },
    {
        path:"product-details/:id",
        component:PrimaryLayoutComponent,
        children:[
            {
                path:"",
                component:ProductDetailsComponent
            }   
    ]
    },
];
