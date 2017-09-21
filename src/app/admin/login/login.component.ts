import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 })
export class LoginComponent { 
  email: string;
  password: string;
  
  constructor(private userSVC: UserService, private router: Router){}

  login(){
    this.userSVC.login(this.email, this.password);
    this.userSVC.verifyUser();
  }

  signup(){
    this.router.navigate(['/admin/sign-up']);
  }

  cancel(){
    this.router.navigate(['']);
  }
}