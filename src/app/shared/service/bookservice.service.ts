import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../interfaces/review';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(
      'https://login-register-1948f-default-rtdb.firebaseio.com/books.json'
    );
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(
      'https://login-register-1948f-default-rtdb.firebaseio.com/books/' +
      bookId +
      '/.json'
    );
  }

  getBookReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(
      'https://login-register-1948f-default-rtdb.firebaseio.com/reviews.json'
    );
  }

  postReviews(newReview: Review) {
    return this.http.post(
      'https://login-register-1948f-default-rtdb.firebaseio.com/reviews.json',
      newReview
    );
  }

  postbooks(book: Book) {
    return this.http.post(
      'https://login-register-1948f-default-rtdb.firebaseio.com/books.json',
      book
    );
  }
}
