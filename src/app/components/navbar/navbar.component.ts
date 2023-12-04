import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/shared/interfaces/users';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(
    private auth: AuthserviceService,
  ) {}

  userId: string = '';
  user: Users = {
    userId: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    dob: new Date(),
    mobile: '',
    password: '',
  };
  cartItems: number = 0;

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.userId = userId;
    }

    this.getUserDetails();

    //Behcviour subject to check whether the user details updated or not
    this.auth.userUpdated.subscribe(
      (status) => {
        console.log(status);
        this.getUserDetails();
      },
      (err) => {
        console.log('error ' + err);
      }
    );
  }


  getUserDetails() {
    this.auth.getUserDetails(this.userId).subscribe(
      (data) => {
        this.user = Object(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout(): void {
    let logout: boolean = confirm('Are you sure you want to logout?');
    if (logout) {
      this.auth.logout();
    }
  }
}