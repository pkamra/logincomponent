// import { Component } from '@angular/core';

// @Component({
//   selector: 'login-component',
//   template: `<h1>Sample component Version 0.1.2</h1>`
// })
// export class LoginComponent {

//   constructor() {
//   }

// }




import { Component ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from './headers';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'login-component',
 // templateUrl: 'reusablelogin.html',
 template:`<div class="container" style="margin-top: 20px">
    <div class="row">
        <div class="col-lg-3"></div>
        <div class="col-lg-6">
          <div class="login jumbotron center-block">
          <h3>Login</h3>
          <form role="form" (submit)="login($event, username.value, password.value)">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" #username class="form-control" id="username" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" #password class="form-control" id="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-default" id="submitButton">Submit</button>
        </form>
        </div>
        </div>
        <div class="col-lg-3"></div>
    </div>
</div>`,
  
  styles: [ 'reusablelogin.css' ]
})

export class LoginComponent {
  //commented since it will not be called via a markup but rather from routes
  // @Input() 
  private endPoint:string;

  private targetRoute:string;

  constructor(public router: Router, public http: Http,public route:ActivatedRoute) {
    //  console.log("enpPoint passed"+this.endPoint);
    this.endPoint =  route.snapshot.data[0]['endPoint'];
   // this.targetRoute = route.snapshot.data[0]['targetRoute'];
   if (route.snapshot.params['targetRoute'] != null && route.snapshot.params['targetRoute'] != undefined){
      console.log("endPoint passed via route parameters"+route.snapshot.params['targetRoute']);
      this.targetRoute = route.snapshot.params['targetRoute'] ;
   }else{
      console.log("endPoint passed via route data json"+route.snapshot.data[0]['targetRoute']);
      this.targetRoute = route.snapshot.data[0]['targetRoute'];
   }

    console.log("enpPoint passed in constructor"+this.endPoint);
  }

  login(event:any, username:any, password:any) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    //console.log("enpPoint passed"+this.endPoint);
    this.http.post(this.endPoint+'/api/v1/login', body, { headers: contentHeaders })
      .subscribe(
        response => {
            if (response.json().api_token != null  && response.json().api_token != undefined && response.json().errors == undefined ){
                sessionStorage.setItem('api_token', response.json().api_token);
                sessionStorage.setItem('expiry', response.json().expiry);
                 this.router.navigate([this.targetRoute]);
            }else if (response.json().errors != undefined){
                alert("Unauthorized");
            }
        
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
    

  }

}


