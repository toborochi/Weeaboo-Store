import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModelServer, ProductReportModel} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private serverUrl = environment.SERVER_URL;

  getAllProductsPromo(){
    return this.http.get(this.serverUrl+'products/promo');
  }

  getAllProductsName(n){
    return this.http.get(this.serverUrl+'products/name/'+n);
  }

  getSingleProduct(id: Number):Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.serverUrl+'products/search/'+id);
  }

  getReportProduct():Observable<ProductReportModel[]>{
    return this.http.get<ProductReportModel[]>(this.serverUrl+'products_report');
  }

}
