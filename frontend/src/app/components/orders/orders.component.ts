import {Component, NgZone, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {OrderService} from "../../services/order.service";
import {OrderModel} from "../../models/order.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogOrderStatusComponent} from "../dialogs/dialog-order-status/dialog-order-status.component";
import {DialogOrderDetailComponent} from "../dialogs/dialog-order-detail/dialog-order-detail.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: OrderModel[] = [];
  loading = true;

  constructor(private userService:UserService,
              private spinner:NgxSpinnerService,
              private orderService: OrderService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.userService.auth){
    this.spinner.show();
    this.orderService.getPreviousOrders().subscribe(prods =>{
      this.orders = prods;
      console.log(this.orders);
      this.loading = false;
      this.spinner.hide();
    });
    }
  }

  showStatus(orderStatus:OrderModel){
    this.dialog.open(DialogOrderStatusComponent,{
      data: orderStatus
    });
  }


  orderDetail(cartId):void{
    let id : number = Number(cartId);
    this.orderService.getOrderDetail(id).subscribe(res=>{
      this.dialog.open(DialogOrderDetailComponent,{
        data: res
      });
    });
  }

}
