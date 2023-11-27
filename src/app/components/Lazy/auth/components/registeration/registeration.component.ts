import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { customvalidator } from '../../../../../shared/validators/customvalidator.validator';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { Users } from 'src/app/shared/interfaces/users';

@Component({
  // standalone:true,
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css'],
})
export class RegisterationComponent implements OnInit {
  constructor(private auth: AuthserviceService) {}

  registerForm!: FormGroup;
  user!: Users;
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
    this.user.firstName = this.registerForm.value.firstName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.email = this.registerForm.value.email;
    this.user.dob = this.registerForm.value.dob;
    this.user.mobile = this.registerForm.value.mobile;
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    this.auth.Register(this.user);
  }
}
