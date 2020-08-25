import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderModel} from "../models/order.model";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";
import {AddressInputModel, AddressModel} from "../models/address.model";
import {Payment_methodModel} from "../models/payment_method.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private serverUrl = environment.SERVER_URL;
  constructor(private http:HttpClient,
              private userService:UserService) { }

  getAddresses():Observable<AddressModel[]> {
    return this.http.get<AddressModel[]>(this.serverUrl+'address/user/'+this.userService.id);
  }

  saveAddress(data: AddressInputModel):Observable<any> {
    console.log(data);
    return this.http.post<any>(this.serverUrl+'address',{
      street : data.street,
      city: data.city,
      country: data.country,
      post_code: data.postcode,
      user_id: this.userService.id
    });
  }
}
