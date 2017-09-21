import { Component } from '@angular/core';
import { UserService } from '../adminShared/user.service'; 
import { Router } from '@angular/router'; 

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
 })
export class SignUpComponent {
    email: string; 
    password: string; 
    passwordConfirm: string;
    passwordFail: boolean = false; 


    constructor(private userSVC: UserService, private router: Router){}

    signUp(){
        if (this.password !== this.passwordConfirm){
            this.passwordFail =true;
        }else { 
            this.passwordFail=false;
            this.userSVC.register(this.email,this.password); 
            this.userSVC.verifyUser();
        }
    }

    cancel(){
        this.router.navigate(['/admin/login']);
    }
 }