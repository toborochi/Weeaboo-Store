import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {delay} from "rxjs/operators";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() email:string;
  @Input() passwd:string;

  constructor( private spinner:NgxSpinnerService,
               private userService: UserService,
               private router:Router) { }


  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    },250);
  }

  authOk(): boolean{
    return this.userService.auth;
  }

  registerUser(email,passwd): void{
    console.log(this.email+" "+this.passwd);
    this.userService.registerUser(this.email,this.passwd).subscribe((response: {
      id: number,
      username: string,
      email: string,
      role: number,
      token: string
    }) =>{
      console.log(response);
    });
  }

  loginUser(email,passwd): void{
    console.log(this.email+" "+this.passwd);
    this.userService.loginUser(this.email,this.passwd).subscribe((response: {
      id: number,
      username: string,
      email: string,
      role: number,
      token: string
    }) =>{
      this.userService.id= response.id;
      this.userService.role= response.role;
      this.userService.name=response.username;
      this.userService.email=response.email;
      this.router.navigate(['/profile']).then();
      console.log(response);
    });
  }
}
