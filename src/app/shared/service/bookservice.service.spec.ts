import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BookserviceService } from './bookservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Book } from '../interfaces/book';
import { Review } from '../interfaces/review';

describe('BookserviceService', () => {
  let service: BookserviceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookserviceService],
    });

    service = TestBed.inject(BookserviceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Test case-1
  it('Testing getlist of books', () => {
    const mockBooks: Book[] = [];

    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne(
      'https://login-register-1948f-default-rtdb.firebaseio.com/books.json'
    );
    // console.log(req);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockBooks);
  });

  //Test case-2
  it('Testing  getBookById Method', () => {
    const bookId = '123';
    const mockBook: Book = {
      id: '123',
      author: 'Arul',
      country: 'India',
      genre: 'Adventure',
      imageLink: 'https://i.ibb.co/KhLQrw1/things-fall-apart.jpg',
      language: 'English',
      link: 'https://en.wikipedia.org/wiki/Things_Fall_Apart',
      pages: 199,
      price: 200,
      rating: 5,
      title: 'Sherlock Homes',
      year: 2020,
      description: 'Arullll',
    };

    service.getBookById(bookId).subscribe((book) => {
      // console.log(book)
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(
      `https://login-register-1948f-default-rtdb.firebaseio.com/books/${bookId}/.json`
    );
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockBook);
  });

  //Test case-3
  it('Testing getBookReviews Method', () => {
    const mockReviews: Review[] = [];

    service.getBookReviews().subscribe((reviews) => {
      expect(reviews).toEqual(mockReviews);
    });

    const req = httpTestingController.expectOne(
      'https://login-register-1948f-default-rtdb.firebaseio.com/reviews.json'
    );
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockReviews);
  });

  //Test case-4
  it('Testing  postReviews Method', () => {
    const newReview: Review = {
      user: 'Arul',
      rating: 5,
      comment: 'Nice book',
    };

    service.postReviews(newReview).subscribe((response) => {
      expect(response).toBe(newReview);
    });

    const req = httpTestingController.expectOne(
      'https://login-register-1948f-default-rtdb.firebaseio.com/reviews.json'
    );
    expect(req.request.method).toBe('POST');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(newReview);
  });

  //Test case-5
  it('Testing postbooks method', () => {
    const book: Book = {
      id: '123',
      author: 'Arul',
      country: 'India',
      genre: 'Adventure',
      imageLink: 'https://i.ibb.co/KhLQrw1/things-fall-apart.jpg',
      language: 'English',
      link: 'https://en.wikipedia.org/wiki/Things_Fall_Apart',
      pages: 199,
      price: 200,
      rating: 5,
      title: 'Sherlock Homes',
      year: 2020,
      description: 'Arullll',
    };

    service.postbooks(book).subscribe((response) => {
      expect(response).toBe(book);
    });

    const req = httpTestingController.expectOne(
      'https://login-register-1948f-default-rtdb.firebaseio.com/books.json'
    );
    expect(req.request.method).toBe('POST');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(book);
  });

  it('Checking 404 error test case', () => {
    const err = '404 error occured';
    service.getBooks().subscribe(
      (data) => {
        fail('404 error occured');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(err);
      }
    );

    const req = httpTestingController.expectOne(
      'https://login-register-1948f-default-rtdb.firebaseio.com/books.json'
    );
    req.flush(err, { status: 404, statusText: 'not Found' });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
