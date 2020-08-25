import {Component, OnInit, ViewChild} from '@angular/core';
import {AddressService} from "../../services/address.service";
import {UserService} from "../../services/user.service";
import {AddressInputModel, AddressModel} from "../../models/address.model";
import {PaymentMethodService} from "../../services/payment-method.service";
import {MethodInputModel, Payment_methodModel} from "../../models/payment_method.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogAddressComponent} from "../dialogs/dialog-address/dialog-address.component";
import {DialogMethodComponent} from "../dialogs/dialog-method/dialog-method.component";
import {jsPDF} from "jspdf";
import "jspdf-autotable"
import {UserOptions} from "jspdf-autotable";
import {NgxSpinnerService} from "ngx-spinner";
import {OrderReportModel} from "../../models/order.model";
import {OrderService} from "../../services/order.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from "@angular/material/sort";
import {DatePipe} from "@angular/common";
import {DialogOrderDetailComponent} from "../dialogs/dialog-order-detail/dialog-order-detail.component";
import {ProductReportModel} from "../../models/product.model";
import {ProductService} from "../../services/product.service";

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Admin
  orders : OrderReport[] = [];
  products : ProductReport[] = [];

  displayedColumns: string[] = ['id','date_created','status','username','email','sales_price','options'];
  displayedColumnsProducts: string[] = ['id','name','stock','price','sell_total','stock_total'];
  dataSource = new MatTableDataSource<OrderReport>(this.orders);
  dataSource2 = new MatTableDataSource<ProductReport>(this.products);


  loadTable : boolean = false;
  loadTable2 : boolean = false;

// Normal User
  addresses: AddressModel[] = [];
  methods: Payment_methodModel[] = [];
  username : string;
  email : string;

  addressData : AddressInputModel;
  methodData : MethodInputModel;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();


  constructor(private addressService:AddressService,
              private productService : ProductService,
              private orderService : OrderService,
              private userService: UserService,
              private paymentMethodService: PaymentMethodService,
              private router:Router,
              public dialog: MatDialog,
              private spinner:NgxSpinnerService) {
  }

  createAddress(){

    this.addressData = new class implements AddressInputModel {
      city: string;
      country: string;
      postcode: string;
      street: string;
    };

    let dialogRef = this.dialog.open(DialogAddressComponent,{
      data: this.addressData
    });
    dialogRef.afterClosed().subscribe(result=>{
          this.addressData = result;

      if(this.addressData!=undefined) {
        this.addressService.saveAddress(this.addressData).subscribe();
      }
    });
  }

  createMethod(){

    this.methodData = new class implements MethodInputModel {
      cvc: number;
      month: number;
      number: string;
      userid: number;
      year: number;
    };

    let dialogRef = this.dialog.open(DialogMethodComponent,{
      data: this.methodData
    });


    dialogRef.afterClosed().subscribe(result=>{
      this.methodData = result;
      if(this.methodData!=undefined){
        this.paymentMethodService.savePaymentMethods(this.methodData).subscribe();
      }
    });

  }


  ngOnInit(): void {
    this.spinner.show();
    //Normal User
    if(this.userService.auth && this.userService.role===555){
      this.addressService.getAddresses().subscribe(address =>{
        this.addresses = address;
        console.log(this.addresses);
      });

      this.paymentMethodService.getPaymentMethods().subscribe(address =>{
        this.methods = address;
        this.spinner.hide();
      });

    }else{
      // Admin User
      this.orderService.getAllOrders().subscribe(data=>{
          data.forEach(o=>{
            this.orders.push({
              id: o.id,
              date_created : o.date_created,
              status: o.status,
              username: o.user.username,
              email: o.user.email,
              sales_price : o.sales_price,
              shopping_cartid: o.shopping_cartid

            });
          });
        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("ORDS "+this.orders);
        this.loadTable=true;
      });

      this.productService.getReportProduct().subscribe(data=>{
        data.forEach(o=>{
          this.products.push({
            id : o.product.id,
            name : o.product.name,
            price : o.product.price,
            stock : o.product.stock,
            sell_total : o.total_sell,
            stock_total : o.total_stock
          });
        });
        this.dataSource2 = new MatTableDataSource(this.products);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        console.log("PRODS"+this.products);
        this.loadTable2=true;

      });

    }
    this.username=this.userService.name;
    this.email=this.userService.email;
    this.spinner.hide();
  }


  getRole(){
    return this.userService.role;
  }

  logoutUser(): void{
    this.router.navigate(['/login']).then();
    this.userService.logout();
  }

  orderDetail(cartId):void{
    let id : number = Number(cartId);
    this.orderService.getOrderDetail(id).subscribe(res=>{
      this.dialog.open(DialogOrderDetailComponent,{
        data: res
      });
    });
  }

  genPDF(){

    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;

    let values: any;
    values = this.orders.map( (element) => Object.values(element));
    doc.text("Reporte de Pedidos", 20, 20);
    doc.autoTable({
      head: [['id','date_created','status','username','email','sales_price']],
      body: values
    });
    doc.save(`Reporte Pedidos ${new Date()}.pdf`);
  }

  genPDFProducts(){

    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;

    let values: any;
    values = this.products.map( (element) => Object.values(element));
    doc.text("Reporte de Productos", 20, 20);
    doc.autoTable({
      head: [this.displayedColumnsProducts],
      body: values
    });
    doc.save(`Reporte Productos ${new Date()}.pdf`);
  }
}

export interface OrderReport {
  id:number,
  date_created: string,
  status: string,
  username: string,
  email:string,
  sales_price:number,
  shopping_cartid:number
};

export interface ProductReport {
  id:number,
  name: string,
  stock:number,
  price : number,
  sell_total: number,
  stock_total : number
};
