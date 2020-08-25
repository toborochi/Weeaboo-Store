import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DialogAddressComponent } from './components/dialogs/dialog-address/dialog-address.component';
import { DialogMethodComponent } from './components/dialogs/dialog-method/dialog-method.component';
import { DialogOrderStatusComponent } from './components/dialogs/dialog-order-status/dialog-order-status.component';
import { DialogOrderDetailComponent } from './components/dialogs/dialog-order-detail/dialog-order-detail.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    LoginComponent,
    ShoppingCartComponent,
    FooterComponent,
    OrdersComponent,
    ProfileComponent,
    CheckoutComponent,
    DialogAddressComponent,
    DialogMethodComponent,
    DialogOrderStatusComponent,
    DialogOrderDetailComponent,
    ProductSearchComponent,

  ],
  entryComponents: [DialogAddressComponent,DialogMethodComponent,DialogOrderStatusComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
