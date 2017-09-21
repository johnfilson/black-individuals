import { Injectable }  from '@angular/core';
//Injectable lets us dependency injection to add our service to other components and modules
import {
    CanActivate, 
    Router, 
    ActivatedRouteSnapshot,
    RouterStateSnapshot
 }from '@angular/router'; 
 import * as firebase from 'firebase'; 

 @Injectable()
 export class UserService implements CanActivate { 
     userLoggedIn: boolean = false; 
     loggedInUser: string; 
     authUsers: any; 

     constructor( private router: Router) { 
          var config = {
            apiKey: "AIzaSyAZwzORzJnbkvjpH_VrrIe861t4P_HCrzA",
            authDomain: "angular2course-8dbcd.firebaseapp.com",
            databaseURL: "https://angular2course-8dbcd.firebaseio.com",
            projectId: "angular2course-8dbcd",
            storageBucket: "angular2course-8dbcd.appspot.com",
            messagingSenderId: "1052494336206"
            };
            firebase.initializeApp(config);
        }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        let url: string = state.url; 
        return this.verifyLogin(url); 
    }

    verifyLogin(url: string): boolean { 
        if (this.userLoggedIn) { return true; }

        this.router.navigate(['/admin/login']);
        return false; 
    }

        register(email:string, password: string){ 
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .catch(function(error) { 
                    alert('${error.message} Please Try Again!'); 
                });
        } 

        verifyUser(){ 
            this.authUsers = firebase.auth().currentUser; 

            if (this.authUsers){

                alert('Welcome ${this.authUser.email}'); 
                this.loggedInUser = this.authUsers.email; 
                this.userLoggedIn = true; 
                this.router.navigate(['/admin']);
            }
        }

        login(loginEmail: string, loginPassword: string){ 
            firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
            .catch(function(error){
                alert('${error.message} Unable to login, Try again!'); 
            });
        }

          logout(){ 
            this.userLoggedIn = false;
                firebase.auth().signOut().then(function(){
                alert('Logged Out!'); 
                }, function(error) { 
                alert('${error.message} Unable to logout, Try again!'); 
            });
        }
 }