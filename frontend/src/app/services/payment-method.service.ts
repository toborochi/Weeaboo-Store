import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {AddressInputModel, AddressModel} from "../models/address.model";
import {environment} from "../../environments/environment";
import {MethodInputModel, Payment_methodModel} from "../models/payment_method.model";
import {tap} from "rxjs/operators";
import {JWTRegisterResponse} from "../models/jwt_register_response.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private serverUrl = environment.SERVER_URL;
  private sendedMethod : Payment_methodModel;

  constructor(private http:HttpClient,
              private userService:UserService) { }

  getPaymentMethods():Observable<Payment_methodModel[]> {
    return this.http.get<Payment_methodModel[]>(this.serverUrl+'payment_method/user/'+this.userService.id);
  }

  savePaymentMethods(data: MethodInputModel):Observable<any> {
    return this.http.post<any>(this.serverUrl+'payment_method',{
      userid : this.userService.id,
      number : data.number,
      year : data.year,
      month: data.month,
      cvc: data.cvc
    });
  }
}
