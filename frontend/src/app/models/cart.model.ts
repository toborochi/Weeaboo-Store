import {ProductModelServer} from "./product.model";

export interface CartModelServer{
  total : number,
  data : [{
    product : ProductModelServer,
    numItems : number
  }]
}

export interface CartModelPublic {
  total : number,
  prodData :[{
      id:number,
      inCart : number
  }]
}

export interface OrderItem {
  id : number,
  inCart : number
}

export interface CartOrder {

  userid : number,
  address : number,
  payment_method : number,
  total_payment : number,
  products: OrderItem[]


}
