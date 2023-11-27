import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { customvalidator } from '../../../../../shared/validators/customvalidator.validator';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Users } from 'src/app/shared/interfaces/users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private auth: AuthserviceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  profileForm!: FormGroup;
  user!: Users;
  updatedUser!: Users;
  userId!: string;
  editField: boolean = true;

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
      lastName: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
      mobile: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        customvalidator.mobileNumberValidator,
      ]),
      username: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        customvalidator.usernameValidator,
      ]),
      dob: new FormControl({ value: '', disabled: true }, Validators.required),
    });

    // this.userId = this.auth.userId;
    const userId = sessionStorage.getItem('userId');
    if (userId) this.userId = userId;

    this.auth.getUserDetails(this.userId).subscribe(
      (data) => {
        this.user = Object(data);
        console.log(this.user);
        this.profileForm.patchValue(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  enableControl() {
    this.profileForm.get('firstName')?.enable();
    this.profileForm.get('lastName')?.enable();
    this.profileForm.get('mobile')?.enable();
    this.profileForm.get('username')?.enable();
    this.profileForm.get('dob')?.enable();
  }

  updateDetails() {
    this.updatedUser = this.profileForm.value;
    this.updatedUser.email = this.user.email;
    this.updatedUser.password = this.user.password;
    console.log(this.updatedUser);

    this.auth.updateUserDetailsById(this.userId, this.updatedUser).subscribe({
      error: (err) => console.log('Error while updating' + err),
      complete: () => {
        this.auth.userUpdated.emit('User updated');
        this.profileForm.reset();
        this.toastr.success('Updated Successfully', 'User Info');
        this.router.navigate(['/user']);
      },
    });
  }
}
