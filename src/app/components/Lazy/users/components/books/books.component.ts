import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, map, timeout } from 'rxjs';
import { Book } from 'src/app/shared/interfaces/book';
import { Cart } from 'src/app/shared/interfaces/cart';
import { BookserviceService } from 'src/app/shared/service/bookservice.service';
import { CartserviceService } from 'src/app/shared/service/cartservice.service';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  constructor(
    private bookservice: BookserviceService,
    private dataservice: DataserviceService,
    private cartservice: CartserviceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  books: Book[] = [];
  searchbooks: Book[] = [];
  isSortDivVisible = false;
  book!: Book;
  searchText: string = '';
  isFetching:boolean = false;

  selectedAuthors: string[] = [];
  selectedGenres: string[] = [];
  selectedLanguages: string[] = [];
  selectedYear: number[] = [];

  minPriceValue: number = 0;
  maxPriceValue: number = 1000;

  ngOnInit(): void {
    this.dataservice.searchDisable.next(true);
    this.getBooks();
    this.searchFilter();
  }

  searchFilter() {
    // Time delay using debounce method
    if (this.dataservice.searchText) {
      this.dataservice.searchText
        .pipe(debounceTime(100), distinctUntilChanged())
        .subscribe((data) => {
          this.searchText = data;
          this.searchbooks = this.books.filter((book) =>
            book.title
              .toLocaleLowerCase()
              .includes(this.searchText.toLocaleLowerCase())
          );

          if (this.searchText && this.searchbooks.length == 0) {
            this.toastr.warning('No Result Were found');
          }
        });
    }
  }

  getBooks() {
    this.isFetching = false;
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
        this.searchbooks = this.books;
        this.isFetching = true;
      });
  }

  sortByPriceLowToHigh() {
    this.searchbooks.sort((book1, book2) => book1.price - book2.price);
  }

  sortByPriceHighToLow() {
    this.searchbooks.sort((book1, book2) => book2.price - book1.price);
  }

  sortByratingLowToHigh() {
    this.searchbooks.sort((book1, book2) => book1.rating - book2.rating);
  }

  sortByratingHighToLow() {
    this.searchbooks.sort((book1, book2) => book2.rating - book1.rating);
  }

  sortByRecent() {
    this.searchbooks.sort((book1, book2) => book2.year - book1.year);
  }

  toggleDiv() {
    this.isSortDivVisible = !this.isSortDivVisible;
  }

  addToCart(cartbook: Book) {
    const item: Cart = {
      cartId: '',
      book: cartbook,
      quantity: 1,
      price: cartbook.price,
    };
    this.cartservice.addCartItem(item);
  }

  //For filter operation
  getUniqueAuthors(): string[] {
    return [...new Set(this.books.map((book) => book.author))];
  }

  getUniqueGenres(): string[] {
    return [...new Set(this.books.map((book) => book.genre))];
  }

  getUniqueLanguages(): string[] {
    return [...new Set(this.books.map((book) => book.language))];
  }

  getUniqueYears(): number[] {
    return [...new Set(this.books.map((book) => book.year))];
  }

  filterBooks() {
    let filteredBooks = this.books;

    if (this.selectedAuthors.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        this.selectedAuthors.includes(book.author)
      );
    } else if (this.selectedGenres.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        this.selectedGenres.includes(book.genre)
      );
    } else if (this.selectedLanguages.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        this.selectedLanguages.includes(book.language)
      );
    } else if (this.selectedYear.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        this.selectedYear.includes(book.year)
      );
    } else if (this.minPriceValue >= 0 && this.maxPriceValue <= 1000) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.price >= this.minPriceValue && book.price <= this.maxPriceValue
      );
    } else {
      filteredBooks = this.books;
    }

    this.searchbooks = filteredBooks;
  }

  // addToWishList()
  // {
  //   this.toastr.success('Book added to the favourites');
  // }

  ngOnDestroy() {
    this.dataservice.searchDisable.next(false);
  }
}
