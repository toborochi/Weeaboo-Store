export interface JWTRegisterResponse {
  id: number,
  username: string,
  email: string,
  role: number,
  token: string,
  expiration : number
}
