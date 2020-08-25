export interface OrderModel {
  id : number,
  sales_price : number,
  date_created: string,
  date_dispatched: string,
  date_delivered: string,
  date_received: string,
  date_cancelled: string,
  shopping_cartid: string,
  payment_methodid : string,
  userid : number,
  status : string // in-process, dispatched, in-route, received, cancelled
}

export interface OrderItemDetail{
  amount: number,
  final_price : number
}

export interface OrderProductDetail{
  name : string,
  price : number,
  items : OrderItemDetail
}

export interface OrderDetailModel{
  id: number,
  sales_price: number,
  date_created : string,
  products : OrderProductDetail[]

}


export interface OrderReportModel{
  id: number,
  sales_price: number,
  date_created : string,
  shopping_cartid : number,
  paymentt_methodid: number,
  userid : number,
  status : string,
  user:{
    id:number,
      username: string,
      email: string
  }
}
