import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {JWTRegisterResponse} from "../models/jwt_register_response.model";
import {catchError, map, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverUrl = environment.SERVER_URL;

  private token : string;
  role : number = -1;
  auth : boolean = false;
  id : number = -1;
  name : string;
  email :string;

  constructor(private http: HttpClient,
              private router:Router) { }

  registerUser(singup_email: string,passwd: string):Observable<any> {
    return this.http.post(this.serverUrl+'register',{
      email: singup_email,
      password : passwd
    }).pipe(tap(
      (res:JWTRegisterResponse)=>{
        if(res){
          this.saveToken(res.token,res.expiration.toString());

          this.role = res.role;
          this.auth = true;
          this.id = res.id;
          this.name=res.username;
          this.email=res.email;
        }
      }
    ));
  }

  loginUser(login_email: string,passwd: string):Observable<any> {
    return this.http.post(this.serverUrl+'login',{
      email: login_email,
      password : passwd
    }).pipe(tap(
      (res:JWTRegisterResponse)=>{
        if(res){
          this.saveToken(res.token,res.expiration.toString());

          this.role = res.role;
          this.auth = true;
          this.id = res.id;
          this.name=res.username;
          this.email=res.email;
        }
      }
    ));
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this.auth = false;
    this.role=-1;
  }

  checkSession() : Observable<boolean>{

    return this.http.post(this.serverUrl+'session',{
        token : this.getToken()
      }).pipe(
        map((data: JWTRegisterResponse) => {
          if(data!=undefined){
            this.role = data.role;
            this.auth = true;
            this.id = data.id;
            this.name=data.username;
            this.email=data.email;
            return true;
          }
          this.router.navigate(['/login']).then();
          return false;
        }), catchError( error => {
          this.router.navigate(['/login']).then();
          return throwError( 'Something went wrong!' )
        })
      );

  }

  isLoggedIn() {
    return !!this.getToken();
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}
