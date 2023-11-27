import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { Firestore } from '@angular/fire/firestore';
import { Users } from 'src/app/shared/interfaces/users';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor() {}

  user!: Users;
  users: Users[] = [];
  epassword: string = '';
  @ViewChild('regForm') regform!: NgForm;

  onSubmit() {
    this.user.firstName = this.regform.value.firstName;
    this.user.lastName = this.regform.value.lastName;
    this.user.email = this.regform.value.email;
    this.user.dob = this.regform.value.dob;
    this.user.mobile = this.regform.value.mobile;
    this.user.username = this.regform.value.username;
    this.user.password = this.regform.value.password;

    //this.auth.Register(this.user.email,this.user.password);

    // console.log(this.user);
    // this.users.push(this.user);
    // localStorage.setItem('myUsers',JSON.stringify(this.users));
    // this.regform.reset();
    // this.toastr.success('Register Successfully', 'User Info');
    // this.router.navigate(['/login']);
  }

  // getSuggestedUserName()
  // {
  //   alert('button clicked');
  //   this.regform.setValue({
  //       name:'Arul',
  //           username:'Arul1234',
  //           emailId:'Arul@gmail.com',
  //           password:'',
  //           cpassword:''
  //   });

  //   this.regform.form.patchValue({
  //     username:'Arul1234'
  //   })

  // }
}
