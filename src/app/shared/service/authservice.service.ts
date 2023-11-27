import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Users } from '../interfaces/users';
import { catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  
  userUpdated = new EventEmitter<string>();

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private database: AngularFireDatabase
  ) {}

  login(email: string, password: string) {
    from(this.fireauth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        sessionStorage.setItem('userId', userCredential.user?.uid!);
        sessionStorage.setItem('IsLoggedIn', 'true');
        this.toastr.success('Login Successfully', 'Welcome');
        this.router.navigate(['/user']);
      },(error) => {
          this.toastr.error('Incorrect Credentials');
          this.router.navigate(['/login']);
      }));
  }

  Register(user: Users) {
    this.fireauth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        (userCredential) => {
          let uid = userCredential.user?.uid;
          const Path = `users/${uid}`; 
          this.database
            .object(Path)
            .set(user)
            .then(() => {
              this.toastr.success('Register Successfully', 'User Info');
            })
            .catch((error) => {
              console.error('Error adding user details:', error);
            });

          this.router.navigate(['/login']);
        },
        (err) => {
          this.toastr.error(err.message);
          this.router.navigate(['/register']);
        }
      );
  }

  resetPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        // this.toastr.success('Check your email for reset link', 'User Info');
      },
      (err) => {
        this.toastr.error(err.message, 'User Info');
      }
    );
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        sessionStorage.removeItem('IsLoggedIn');
        sessionStorage.removeItem('userId');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.toastr.error(err.message, 'User Info');
      }
    );
  }

  getUserDetails(uid: string) {
    return this.http.get(
      'https://login-register-1948f-default-rtdb.firebaseio.com/users/' +
        uid +
        '/.json'
    );
  }

  updateUserDetailsById(uid: string, user: Users) {
    return this.http.put(
      'https://login-register-1948f-default-rtdb.firebaseio.com/users/' +
        uid +
        '/.json',
      user
    );
  }

}
