export interface Payment_methodModel {
  id : number,
  userid : number,
  card_number: string,
  exp_year: number,
  exp_month: number,
  cvc: number
}


export interface MethodInputModel {
  userid : number,
  number : string,
  year : number,
  month :number,
  cvc: number
}
