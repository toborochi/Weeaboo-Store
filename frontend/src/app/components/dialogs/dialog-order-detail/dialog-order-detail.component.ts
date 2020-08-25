import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDetailModel, OrderModel} from "../../../models/order.model";

@Component({
  selector: 'app-dialog-order-detail',
  templateUrl: './dialog-order-detail.component.html',
  styleUrls: ['./dialog-order-detail.component.scss']
})
export class DialogOrderDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailModel) { }

  ngOnInit(): void {
  }

}
