import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { LayoutserviceService } from 'src/app/services/layoutservice.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  pageTitle: string;
  pageDesc: string;
  breadcrumbList: Array<string>;

  changepasswordForm: FormGroup;
  passwordchange: any;

  constructor(
    private fb:FormBuilder,
    private toastr : ToastrService,
    private router: Router,
    private authservice : AuthServiceService,
    private layoutService : LayoutserviceService
  ) {
    this.pageTitle = 'Change Your Password';
    this.pageDesc = 'Change password gor login';
    this.breadcrumbList = ['Chane Password'];
    this.changepasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required,]],
      password: ['', [Validators.required,]],
      confirmPassword: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {

    setTimeout(() => {
      this.layoutService.setTitle(this.pageTitle);
      this.layoutService.setPageHeadingDesc(this.pageDesc);
      this.layoutService.setBreadcrumb(this.breadcrumbList);
    });
  }

  changePassword = async() => {
    try{
      // console.log(this.changepasswordForm.value.password);
      const obj ={oldPassword:'',newPassword:'',confirmPassword:''};
      
      obj.oldPassword=sha512(this.changepasswordForm.value.oldPassword);
      obj.newPassword=sha512(this.changepasswordForm.value.password);
      obj.confirmPassword=sha512(this.changepasswordForm.value.confirmPassword);
      if (obj.newPassword != obj.oldPassword) {
        if (obj.newPassword == obj.confirmPassword) {
          const result = await this.authservice.changePassword(obj).toPromise();
          // console.log(result);
          this.passwordchange  = result;
          this.changepasswordForm.patchValue({oldPassword: '', password: '', confirmPassword: ''});
          if (this.passwordchange.message == 'Password Changed Successfully') {
            this.toastr.success(this.passwordchange.message)
          }else{
            this.toastr.warning(this.passwordchange.message);
          }
          
        } else {
          this.toastr.warning('Password Mismatch.');
          
        }
      }
      else {
        this.toastr.warning('Old Password And New Password are same');
        
      }
     
    } catch (e){
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
    }
  }

}
