import {Component, Input, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductModelServer} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  productName : string;
  products : ProductModelServer[];

  constructor(private route:ActivatedRoute,
              private router:Router,
              private productService: ProductService,
              private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        return {
          productName: param.get('productName'),
        };
      })).subscribe(data => {
        this.productName = data.productName;
      this.productService.getAllProductsName(this.productName).subscribe(prods =>{
        this.products = prods as ProductModelServer[];
        this.spinner.hide();
      });
    });



  }

  selectProduct(id: Number){
    this.router.navigate(['/product',id]).then();
  }

}
