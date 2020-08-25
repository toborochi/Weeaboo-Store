import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductComponent} from "./components/product/product.component";
import {LoginComponent} from "./components/login/login.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {OrdersComponent} from "./components/orders/orders.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./guards/auth.guard";
import {ProductSearchComponent} from "./components/product-search/product-search.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'shopping_cart', component: ShoppingCartComponent
  },
  {
    path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]
  },
  {
    path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'search', component: ProductSearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
