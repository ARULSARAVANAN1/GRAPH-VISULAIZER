import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { customvalidator } from '../../../../../shared/validators/customvalidator.validator';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { Users } from 'src/app/shared/interfaces/users';
import { MatDialog } from '@angular/material/dialog';
import { DialogcompComponent } from '../dialogcomp/dialogcomp.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email!: string;
  password!: string;
  users!: Users[];
  isFetching!:Boolean;

  constructor(
    private toastr: ToastrService,
    private auth: AuthserviceService,
    private matDialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        customvalidator.passwordPattern,
      ]),
    });
  }

  submit() {
    this.isFetching = false;
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.auth.login(this.email, this.password);
    this.isFetching=true;
  }

  resetPassword() {
    this.matDialog.open(DialogcompComponent);
  }
}
