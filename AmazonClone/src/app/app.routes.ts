import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AmcComponent } from './amc/amc.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { MyOrderComponent } from './my-order/my-order.component';

export const routes: Routes = [
    {path:'home',component:AmcComponent},
    {path:'login',component:LoginComponent},
    {path:'cart',component:CartComponent},
    {path:'my-order' ,component:MyOrderComponent},
    {path: '', redirectTo:'home',pathMatch:'full'}
];
