import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   username: string = "";  
   password: string = "";  
 
   constructor(private _auth: AuthService, private _router: Router, private toastr: ToastrService, public crudService: CrudService) {  
     if (this._auth.loggedIn) {  
       this._router.navigate(['home/product-listing']);  
     }  
   }  
   login(): void {  
     if (this.username != '' && this.password != '') {  
       if (this._auth.login(this.username, this.password)) { 
        this.crudService.showSpinner(); 
         this._router.navigate(["home/product-listing"]);  
         this.toastr.success('User Logged in Successfully', '', {
          timeOut: 1500,
        });
       }  
       else  
       this.toastr.error('Wrong Username or Password', '', {
        timeOut: 1500,
      });
     }  else {
      this.toastr.error('Username or Password Can Not be empty', '', {
        timeOut: 1500,
      });
     }
   }  
}
