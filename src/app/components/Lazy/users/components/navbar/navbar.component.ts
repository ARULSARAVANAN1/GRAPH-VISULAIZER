import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';
import { Users } from 'src/app/shared/interfaces/users';
import { BookserviceService } from 'src/app/shared/service/bookservice.service';
import { Book } from 'src/app/shared/interfaces/book';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { ToastrService } from 'ngx-toastr';
import { CartserviceService } from 'src/app/shared/service/cartservice.service';
import { Cart } from 'src/app/shared/interfaces/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private auth: AuthserviceService,
    private dataservice: DataserviceService,
    private bookservice: BookserviceService,
    private toastr: ToastrService,
    private cartservice: CartserviceService
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
  value: string = '';
  timer: any;
  cartItems: number = 0;
  cartBooks!: Cart[];
  searchDisable: boolean = false;

  books: Book[] = [];
  filteredBooks!: Book[];

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.userId = userId;
    }

    this.getUserDetails();
    this.getBooks();
    this.getCartItems();

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

    //Behaviour subject to open and close the search bar
    this.dataservice.searchDisable.subscribe(
      (data) => {
        this.searchDisable = data;
      },
      (err) => {
        console.log('error ' + err);
      }
    );

    //Behaviour subject to check the cart items for mat-batch notification
    this.dataservice.cartItems.subscribe(
      (data) => {
        this.cartItems = data;
      },
      (err) => {
        console.log('error ' + err);
      }
    );
  }

  logout(): void {
    let logout: boolean = confirm('Are you sure you want to logout?');
    if (logout) {
      this.auth.logout();
    }
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

  valuefromOption() {
    this.filter(this.value);
  }

  valuefromSearch() {
    if (this.value == '') {
      this.toastr.warning('No Result Found');
    } else {
      this.dataservice.searchText.next(this.value);
    }
  }

  getBooks() {
    this.bookservice
      .getBooks()
      .pipe(
        map((response: any) => {
          const books: Book[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              books.push({ ...response[key], id: key });
            }
          }
          return books;
        })
      )
      .subscribe((data) => {
        this.books = data;
      });
  }

  filter(value: string) {
    if (value == '') {
      this.filteredBooks = [];
      this.dataservice.searchText.next('');
    } else {
      this.filteredBooks = this.books.filter((book) =>
        book.title.toLowerCase().includes(value.toLocaleLowerCase())
      );
      console.log(this.filteredBooks);
    }
  }

  selectedBook(event: any) {
    const searchBook = event.option.value;
    // console.log(searchBook);
    this.dataservice.searchText.next(searchBook);
  }

  getCartItems() {
    this.cartservice
      .getCartItemsByuserId(this.userId)
      .pipe(
        map((res: any) => {
          let length = 0;
          for (const key in res) {
            ++length;
          }
          return length;
        })
      )
      .subscribe(
        (data) => {
          this.cartItems = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
