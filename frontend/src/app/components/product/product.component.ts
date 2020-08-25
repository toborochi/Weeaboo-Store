import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute,ParamMap} from "@angular/router";
import {map} from "rxjs/operators";
import {ProductService} from "../../services/product.service";
import {ProductModelServer} from "../../models/product.model";
import {NgxSpinnerService} from "ngx-spinner";
import {CartService} from "../../services/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild('quantity') quantityInput;

  id: Number;
  product : ProductModelServer;
  showSpinner : boolean = true;

  constructor(private route:ActivatedRoute,
              private productService: ProductService,
              private cartService : CartService,
              private spinner:NgxSpinnerService,
              private snackBar:MatSnackBar) { }

  addToCart(id: number) {

    console.log("CANTIDAD: "+this.quantityInput.nativeElement.value);
    if(id!=undefined && this.quantityInput.nativeElement.value<=this.product.stock){
      this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
      this.snackBar.open("Producto Añadido",null,{duration:2000 });
    }else{
      this.snackBar.open("Cantidad Erronea",null,{duration:2000 });
    }

  }


  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod as ProductModelServer;
        console.log("PRODUCTO CONSULTADO: "+JSON.stringify(this.product));
        this.spinner.hide();
        this.showSpinner=false;
      });
    });
  }

}
