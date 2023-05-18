import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as sha512 from 'js-sha512';
import * as sha256 from 'js-sha256';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: any;
  errorText: string = '';

  constructor( 
    private fb:FormBuilder,
    private toastr : ToastrService,
    private router: Router,
    private authservice : AuthServiceService,
    private layoutService : LayoutserviceService
    ) { 
    this.signinForm = this.fb.group({
      userId : ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  forgotPasswordClick() {
    this.toastr.info("Forgot password", "Please contact to Authority (OAIC-Bhubaneswar).", {
      positionClass: 'toast-center-center',
      timeOut: 20000
    });
  }

  signIn = async () => {
    if(this.signinForm.valid){
      const shafivepass = sha256.sha256(this.password);
      this.password = sha512.sha512(this.password);
      
      const data = {
        userId: this.signinForm.value.userId,
        password : this.password,
        password2: shafivepass
      }
      const result = await this.authservice.signIn(data).toPromise()
        // console.log("result",result);
      if(result.isSuccess){
              this.toastr.success(result.message)
              // this.errorText = result.message;
              this.layoutService.setUserToken(result.token)
              this.authservice.setUserRole(result.userRole);
              this.authservice.setUserName(result.userName);
              this.authservice.setUserId(result.user_id);
              // if (result.Block_Code ) {
              this.authservice.setUserBlockCode(result.Block_Code);
              this.authservice.setUserDistCode(result.Dist_Code);
              // }
              

              switch (result.userRole) {
                case 'SCHEME': {
                  this.router.navigate(['scheme']);
                  break;
                }
                case 'CDAO': {
                  this.router.navigate(['cdao']);
                  break;
                }
                case 'BAO': {
                  this.router.navigate(['bao']);
                  break;
                }
                case 'ADO': {
                  this.router.navigate(['ado']);
                  break;
                }
                case 'VAW': {
                  this.router.navigate(['vaw']);
                  break;
                }
                case 'DEALER': {
                  this.router.navigate(['dealer']);
                  break;
                }
                case 'OSSC': {
                  this.router.navigate(['ossc']);
                  break;
                }
                case 'DAFE': {
                  this.router.navigate(['dafe']);
                  break;
                }
                case 'ADMIN': {
                  this.router.navigate(['admin']);
                  break;
                }
              }
      }else{
                this.toastr.error(result.message);
                this.errorText = result.message;
      }        
    }else{
      alert('Please enter the required details')
    }
  }


  get password() {
    return this.signinForm.value['password'];
  }
  set password(value: string) {
    this.signinForm.value['password'] = value;
  }
}
