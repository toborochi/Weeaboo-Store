import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddressInputModel} from "../../../models/address.model";
import {MethodInputModel} from "../../../models/payment_method.model";

@Component({
  selector: 'app-dialog-method',
  templateUrl: './dialog-method.component.html',
  styleUrls: ['./dialog-method.component.scss']
})
export class DialogMethodComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MethodInputModel) { }


  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
