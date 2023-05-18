import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators , FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as sha512 from 'js-sha512';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  signupForm: any;
  userHobbiesForm: any;
  Data: Array<any> = [
    { name: 'Dance', value: 'pear' },
    { name: 'Plum', value: 'plum' },
    { name: 'Kiwi', value: 'kiwi' },
    { name: 'Apple', value: 'apple' },
    { name: 'Lime', value: 'lime' }
  ]

  constructor(
    private fb:FormBuilder,
    private toastr : ToastrService,
    private authservice : AuthServiceService,
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email : ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      password : ['', [Validators.required]],
      pswrepeat: ['', [Validators.required]],
      gender : ['', [Validators.required]],
      education : ['', [Validators.required]],
      UserHobbiesList: this.fb.array([])
      
    })

    this.userHobbiesForm = this.fb.group({
      hobbies: this.fb.array([], [Validators.required])
    })

   }

  ngOnInit(): void {
  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.userHobbiesForm.get('hobbies') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  signUp = async() => {
    try {
      if(this.signupForm.valid) {
        if(this.userHobbiesForm.valid){
          this.password = sha512.sha512(this.password)
          this.signupForm.value.UserHobbiesList.push(this.userHobbiesForm.value)
          this.authservice.signIn(this.signupForm.value).subscribe(result => {
            this.toastr.success('User Details added successfully');
            this.signupForm.reset();
            this.userHobbiesForm.reset();
          })
        }else {
          this.toastr.error('Choose minimum one hobbies.');
         }
      } else {
        this.toastr.error('Please fill all required fields first');
       }
    } catch (e) {
      this.toastr.error('Sorry. Server problem. Please try again.');
      console.error(e);
   }
  }


  get password() {
    return this.signupForm.value['password'];
  }
  
  set password(value: string) {
    this.signupForm.value['password'] = value;
  }
}
