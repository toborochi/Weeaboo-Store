import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "./product.service";
import {OrderService} from "./order.service";
import {environment} from "../../environments/environment";
import {CartModelPublic, CartModelServer} from "../models/cart.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {ProductModelServer} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private serverUrl = environment.SERVER_URL;

  private cartDataClient : CartModelPublic={
    total : 0,
    prodData : [{
        inCart:0,
        id: 0
    }]
  };



  private cartDataSever : CartModelServer={
    total: JSON.parse(localStorage.getItem('CART'))?.total || 0,
    data : [{
      product : undefined,
      numItems:0
    }]

  };

  cartTotal$ = new BehaviorSubject<number>(0);
  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataSever);

  constructor(private http: HttpClient,
              private productService : ProductService,
              private router:Router) {

    this.cartTotal$.next(this.cartDataSever.total);
    this.cartDataObs$.next(this.cartDataSever);

    let info : CartModelPublic = JSON.parse(localStorage.getItem('CART'));

    if(info!=null && info!=undefined && info.prodData[0].inCart!=0){
      this.cartDataClient = info;

      this.cartDataClient.prodData.forEach((p)=>{
            this.productService.getSingleProduct(p.id).subscribe((actualProductInfo:ProductModelServer)=>{
                if(this.cartDataSever.data[0].numItems===0){
                  this.cartDataSever.data[0].numItems = p.inCart;
                  this.cartDataSever.data[0].product = actualProductInfo;
                  this.cartDataClient.total = this.cartDataSever.total;
                  localStorage.setItem('CART',JSON.stringify(this.cartDataClient));
                }else{
                  this.cartDataSever.data.push({
                      numItems: p.inCart,
                    product : actualProductInfo
                  });
                  this.cartDataClient.total = this.cartDataSever.total;
                  localStorage.setItem('CART',JSON.stringify(this.cartDataClient));
                }
                this.cartDataObs$.next({... this.cartDataSever});
            });
      });
    }

  }

  public CalculateTotal() {
    let Total = 0;

    this.cartDataSever.data.forEach(p => {
      const numItems :number = p.numItems;
      const price :number = p.product.price;

      Total += numItems * price;
    });
    this.cartDataSever.total = Total;
    this.cartTotal$.next(this.cartDataSever.total);
  }

  AddProductToCart(id: Number, quantity?: number) {

    this.productService.getSingleProduct(id).subscribe(prod => {
      // If the cart is empty
      if (this.cartDataSever.data[0].product === undefined) {
        this.cartDataSever.data[0].product = prod;
        this.cartDataSever.data[0].numItems = quantity !== undefined ? quantity : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].inCart = this.cartDataSever.data[0].numItems;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataSever.total;
        localStorage.setItem('CART', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataSever});

      }  // END of IF
      // Cart is not empty
      else {
        let index = this.cartDataSever.data.findIndex(p => p.product.id === prod.id);

        // 1. If chosen product is already in cart array
        if (index !== -1) {

          if (quantity !== undefined && quantity <= prod.stock) {

            this.cartDataSever.data[index].numItems = this.cartDataSever.data[index].numItems < prod.stock ? quantity : prod.stock;
          } else {

            this.cartDataSever.data[index].numItems < prod.stock ? this.cartDataSever.data[index].numItems++ : prod.stock;
          }

          console.log(this.cartDataSever.data[index].numItems + "EEEY");

          this.cartDataClient.prodData[index].inCart = this.cartDataSever.data[index].numItems;

        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataSever.data.push({
            product: prod,
            numItems: quantity
          });
          this.cartDataClient.prodData.push({
            inCart: quantity,
            id: prod.id
          });

        }
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataSever.total;
        localStorage.setItem('CART', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({...this.cartDataSever});
      }  // END of ELSE


    });
  }

  UpdateCartData(index, increase: Boolean) {
    let data = this.cartDataSever.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].inCart = data.numItems;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataSever.total;
      this.cartDataObs$.next({...this.cartDataSever});
      localStorage.setItem('CART', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({...this.cartDataSever});
      } else {
        // @ts-ignore
        this.cartDataObs$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].inCart = data.numItems;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataSever.total;
        localStorage.setItem('CART', JSON.stringify(this.cartDataClient));
      }

    }

  }

  DeleteProductFromCart(index) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm('¿Quieres eliminar este producto?')) {
      this.cartDataSever.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataSever.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {prodData: [{inCart: 0, id: 0}], total: 0};
        localStorage.setItem('CART', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('CART', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataSever.total === 0) {
        this.cartDataSever = {
          data: [{
            product: undefined,
            numItems: 0
          }],
          total: 0
        };
        this.cartDataObs$.next({...this.cartDataSever});
      } else {
        this.cartDataObs$.next({...this.cartDataSever});
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }


  }

  private resetServerData() {
    this.cartDataSever = {
      data: [{
        product: undefined,
        numItems: 0
      }],
      total: 0
    };
    this.cartDataObs$.next({...this.cartDataSever});
  }

}
