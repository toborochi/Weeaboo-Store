import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {ProductModelServer} from "../../models/product.model";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = true;
  images = [
    {
      path: "./assets/banner_megumin.png"
    }
  ];

  products: any[] = [];

  constructor(private productService: ProductService,
              private router:Router,
              private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.productService.getAllProductsPromo().subscribe(prods =>{
      this.products = prods as ProductModelServer[];
      console.log(this.products);
      this.loading = false;
      this.spinner.hide();
    });
  }

  selectProduct(id: Number){
      this.router.navigate(['/product',id]).then();
  }

}
