export interface ProductModelServer {
  id: number;
  code: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  image_url : string;
  promo : number;
}

export interface ProductReportModel{
  product : ProductModelServer,
  total_sell : number,
  total_stock : number,
}
