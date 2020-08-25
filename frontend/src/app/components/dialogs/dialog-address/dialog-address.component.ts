import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddressInputModel} from "../../../models/address.model";

@Component({
  selector: 'app-dialog-address',
  templateUrl: './dialog-address.component.html',
  styleUrls: ['./dialog-address.component.scss']
})
export class DialogAddressComponent implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<DialogAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddressInputModel) { }


  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
