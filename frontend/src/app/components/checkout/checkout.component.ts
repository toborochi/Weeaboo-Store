import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {PaymentMethodService} from "../../services/payment-method.service";
import {AddressModel} from "../../models/address.model";
import {Payment_methodModel} from "../../models/payment_method.model";
import {UserService} from "../../services/user.service";
import {AddressService} from "../../services/address.service";
import {CartService} from "../../services/cart.service";
import {CartModelServer} from "../../models/cart.model";
import {OrderItem} from "../../models/cart.model";
import {CartOrder} from "../../models/cart.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  addresses: AddressModel[] = [];
  methods: Payment_methodModel[] = [];
  cartData : CartModelServer;
  orderItem : Array<OrderItem> = new Array<OrderItem>();
  isChecked = true;

  finalOrder : CartOrder = new class implements CartOrder {
    address: number;
    payment_method: number;
    products: OrderItem[];
    total_payment: number;
    userid: number;
  };

  cartTotal : number;

  constructor(
              private paymentMethodService: PaymentMethodService,
              private userService: UserService,
              private addressService: AddressService,
              private cartService: CartService,
              private orderService: OrderService,
              private snackBar: MatSnackBar,
              private router:Router) { }



  ngOnInit(): void {
    if(this.userService.auth){
      this.addressService.getAddresses().subscribe(address =>{
        this.addresses = address;
        console.log(this.addresses);
      });

      this.paymentMethodService.getPaymentMethods().subscribe(methods =>{
        this.methods = methods;
        console.log(this.methods);
      });
      this.cartService.cartDataObs$.subscribe( (data:CartModelServer) =>this.cartData=data);
      this.cartService.cartTotal$.subscribe(total=>this.cartTotal=total);
    }
  }

  proceedPayment(method,direction){
    //console.log(JSON.stringify(method)+' '+JSON.stringify(direction));
    //console.log(JSON.stringify(this.cartData));

    this.cartData.data.forEach((item)=>{
      this.orderItem.push({
        id : item.product.id,
        inCart : item.numItems
      });
    });

    var dirId = direction.id;
    var metId = method.id;

    this.finalOrder.userid = this.userService.id;
    this.finalOrder.products = this.orderItem;
    this.finalOrder.address = dirId;
    this.finalOrder.payment_method = (this.isChecked)?metId:null;
    this.finalOrder.total_payment = this.cartTotal;

    console.log(JSON.stringify(this.orderItem));

   this.orderService.createOrder(this.finalOrder).subscribe(()=>{
     this.snackBar.open("Orden Procesada",null,{duration:2000 });
   },()=>{
     this.snackBar.open("Ha sucedido un error",null,{duration:2000 });
   },()=>{
     this.router.navigate(['/profile']).then();
   });
    console.log("OBJ PAGO "+this.finalOrder);
    this.orderItem = new Array<OrderItem>();
  }

}
