export interface AddressModel {
  id: number,
  street : string,
  city : string,
  country : string,
  post_code : string,
  user_id : number
}

export interface AddressInputModel {
  street: string;
  city: string;
  country: string;
  postcode: string;
}
