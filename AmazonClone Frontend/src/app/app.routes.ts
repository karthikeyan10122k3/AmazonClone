import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductDisplayComponent } from './pages/product-display/product-display.component';
import { PrimaryLayoutComponent } from './layout/primary-layout/primary-layout.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart-display/cart-display.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
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
    {
        path:"cart",
        component:PrimaryLayoutComponent,
        children:[
            {
                path:"",
                component:CartComponent
            }   
    ]
    },
    {
        path:"login",
        component:LoginComponent,
    },
    {
        path:"register",
        component:RegistrationComponent,
    },
];
