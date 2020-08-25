import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderModel} from "../../../models/order.model";


@Component({
  selector: 'app-dialog-order-status',
  templateUrl: './dialog-order-status.component.html',
  styleUrls: ['./dialog-order-status.component.scss']
})
export class DialogOrderStatusComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOrderStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderModel) { }

  ngOnInit(): void {
  }

}
