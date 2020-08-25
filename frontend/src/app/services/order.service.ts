import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {JWTRegisterResponse} from "../models/jwt_register_response.model";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";
import {OrderDetailModel, OrderModel, OrderReportModel} from "../models/order.model";
import {CartOrder} from "../models/cart.model";
import {Payment_methodModel} from "../models/payment_method.model";
import {CartService} from "./cart.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private serverUrl = environment.SERVER_URL;

  constructor(private http: HttpClient,
              private userService: UserService,
              private cartService: CartService) { }

  getPreviousOrders():Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(this.serverUrl+'orders/user/'+this.userService.id);
  }

  getOrderDetail(shoppingId:number):Observable<OrderDetailModel>{
    return this.http.get<OrderDetailModel>(this.serverUrl+'shopping_cart/user/'+shoppingId);
  }

  createOrder(order: CartOrder):Observable<any>{
    return this.http.post<any>(this.serverUrl+'orders',order).pipe(tap(
      (res)=>{
        if(res){
          console.log("Transferencia: "+JSON.stringify(res));
        }
      }
    ));
  }

  getAllOrders(): Observable<OrderReportModel[]>{
    return this.http.get<OrderReportModel[]>(this.serverUrl+'orders');
  }

}
