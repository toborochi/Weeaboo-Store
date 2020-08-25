import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {CartModelPublic, CartModelServer} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartData : CartModelServer;
  cartTotal : number;
  subTotal : number;

  constructor(private spinner:NgxSpinnerService,
              private cartService: CartService,
              private router:Router,
              private userService:UserService,
              private snackBar: MatSnackBar) {
  }

  proceedBuy(){

    if(this.userService.auth){
      if(this.userService.role===555){
        this.router.navigate(['/checkout']).then();
      }else{
        this.snackBar.open("Admin no puede crear pedidos",null,{duration:1000});
      }

    }else{
      this.router.navigate(['/login']).then();
    }

  }

  deleteProduct(index){
      this.cartService.DeleteProductFromCart(index);
  }

  increment(){
  }

  decrement(){
  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    },250);

    this.cartService.cartDataObs$.subscribe( (data:CartModelServer) =>this.cartData=data);
    this.cartService.cartTotal$.subscribe(total=>this.cartTotal=total);

  }

}
