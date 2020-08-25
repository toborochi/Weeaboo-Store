import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {UserService} from "../../services/user.service";
import {ProductModelServer} from "../../models/product.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private productService: ProductService,
              private router: Router,
              private cartService : CartService,
              private userService:UserService) { }

  products: ProductModelServer[] = [];
  productName : string;

  printear(x){
    this.productName =x.target.value;
    this.router.navigate(['/search',{productName: this.productName}]).then();
  }

  async login()  {
    this.userService.checkSession().subscribe(
      (data:boolean)=>{
        if(data){
          this.router.navigate(['/profile']).then();
        }else{
          this.router.navigate(['/login']).then();
        }
      }
    );
  }

  getProducts(){
    return (this.cartService.cartDataObs$.value.data[0].product!=undefined)?this.cartService.cartDataObs$.value.data.length:0;
  }

  ngOnInit(): void {
  }



}
