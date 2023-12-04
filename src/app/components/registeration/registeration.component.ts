import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { Users } from 'src/app/shared/interfaces/users';
import { customvalidator } from 'src/app/shared/validators/customvalidator.validator';

@Component({
  // standalone:true,
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
})
export class RegisterationComponent implements OnInit {
  
  constructor(private auth: AuthserviceService) {}

  registerForm!: FormGroup;
  users: Users[] = [];

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        mobile: new FormControl('', [
          Validators.required,
          customvalidator.mobileNumberValidator,
        ]),
        username: new FormControl('', [
          Validators.required,
          customvalidator.usernameValidator,
        ]),
        dob: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          customvalidator.passwordPattern,
        ]),
        cpassword: new FormControl('', [Validators.required]),
      },
      { validators: customvalidator.confirmPasswordValidator }
    );
  }

  onSubmit() {
    const user: Users = {
       userId:'',
       firstName: this.registerForm.value.firstName,
       lastName: this.registerForm.value.lastName,
       username: this.registerForm.value.username, 
       email:this.registerForm.value.email,
       dob:this.registerForm.value.dob,
       mobile:this.registerForm.value.mobile,
       password:this.registerForm.value.password
    }
    this.auth.Register(user);
 }
}