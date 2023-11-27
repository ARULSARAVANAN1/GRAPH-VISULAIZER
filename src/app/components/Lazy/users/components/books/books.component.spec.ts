import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { BooksComponent } from './books.component';
import { BookserviceService } from 'src/app/shared/service/bookservice.service';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';
import { CartserviceService } from 'src/app/shared/service/cartservice.service';
import { Book } from 'src/app/shared/interfaces/book';
 
describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockBookService: jasmine.SpyObj<BookserviceService>;
  let dataService: DataserviceService;
  let toastrService: ToastrService;
  let mockCartService: jasmine.SpyObj<CartserviceService>;
  
 
  beforeEach(() => {
    mockBookService = jasmine.createSpyObj('BookserviceService', ['getBooks']);
    mockCartService = jasmine.createSpyObj('CartserviceService', ['addCartItem']);
 
    TestBed.configureTestingModule({
      declarations: [BooksComponent],
      imports: [
        ToastrModule.forRoot(),
      ],
      providers: [
        { provide: BookserviceService, useValue: mockBookService },
        { provide: CartserviceService, useValue: mockCartService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
 
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataserviceService);
    toastrService = TestBed.inject(ToastrService);
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  //Test case - 1
  it('Checking the getBooks on ngOnint', () => {
    const mockResponse = [
      { id: '0', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
      { id: '1', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ]

    spyOn(dataService.searchDisable, 'next');
    mockBookService.getBooks.and.returnValue(of(mockResponse));
    component.ngOnInit();
    expect(dataService.searchDisable.next).toHaveBeenCalledWith(true);
    expect(mockBookService.getBooks).toHaveBeenCalled();

    mockBookService.getBooks().subscribe(() => {
      expect(component.books).toEqual(mockResponse);
    });
  });

  //Test case - 2
  it('checking books based on author filter', () => {
    component.books = [
          { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
          { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
        ];
        
    const filteredByAuthor:Book[] = [
      { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
    ]
    component.selectedAuthors = ['Rowling'];
    component.filterBooks();
    expect(component.searchbooks).toEqual(filteredByAuthor);
  });

  //Test case - 3
  it('checking books based on genre filter', () => {
    component.books = [
          { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
          { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
        ];
    const filteredByGenre:Book[] = [
      { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ]
    component.selectedGenres = ['Fiction'];
    component.filterBooks();
    // console.log(component.searchbooks);
    expect(component.searchbooks).toEqual(filteredByGenre);
  });

  //Test case - 4
  it('checking books based on Language filter', () => {
    component.books = [
          { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
          { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
        ];
    component.selectedLanguages = ['Hindi'];
    component.filterBooks();
    expect(component.searchbooks).toEqual([]);
  });

  //Test case - 5
  it('checking books based on Year filter', () => {
    component.books = [
          { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
          { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
        ];
    
    const filteredBooks:Book[] = [
      { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
      { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ]
    component.selectedYear = [2020];
    component.filterBooks();
    expect(component.searchbooks).toEqual(filteredBooks);
  });

  //Test case - 6
  it('checking price range filter', () => {
    component.books = [
          { id: '1', title: 'Harry Potter',author: 'Rowling',price: 150,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
          { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
        ];
    
    const filteredBooks:Book[] = [
      { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ]
    component.minPriceValue = 200;
    component.maxPriceValue = 300;
    component.filterBooks();
    expect(component.searchbooks).toEqual(filteredBooks);
  });


  //Test case - 7
  it('checking all sort by methods', () => {
    component.searchbooks = [
      { id: '1', title: 'Harry Potter',author: 'Rowling',price: 150,rating: 4,year: 2023,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
      { id: '2', title: 'Harry',author: 'Rowling',price: 200,rating: 5,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ];
    component.sortByPriceLowToHigh();
    expect(component.searchbooks[0].price).toBe(150);
    expect(component.searchbooks[1].price).toBe(200);

    component.sortByPriceHighToLow();
    expect(component.searchbooks[0].price).toBe(200);
    expect(component.searchbooks[1].price).toBe(150);

    component.sortByratingLowToHigh();
    expect(component.searchbooks[0].rating).toBe(4);
    expect(component.searchbooks[1].rating).toBe(5);

    component.sortByratingHighToLow();
    expect(component.searchbooks[0].rating).toBe(5);
    expect(component.searchbooks[1].rating).toBe(4);

    component.sortByRecent();
    expect(component.searchbooks[0].year).toBe(2023);
    expect(component.searchbooks[1].year).toBe(2020);
  });

   //Test case - 8
  it('Checking addCartItem method in cartservice when addToCart Method is called', () => { 
    const mockBook = { id: '1', title: 'Harry Potter',author: 'Rowling',price: 150,rating: 5,year: 2023,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'};
    component.addToCart(mockBook);
    expect(mockCartService.addCartItem).toHaveBeenCalledWith({
      cartId: '',
      book: mockBook,
      quantity: 1,
      price: mockBook.price,
    });
  });

  //Test case - 9
  it('Checking searchbar and filter books',  fakeAsync(() => {

    component.books = [
      { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
      { id: '2', title: 'Harry',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ];

    dataService.searchText.next("Harry");
    component.searchFilter();
    tick(1000);

    expect(component.searchText).toEqual('Harry');
    expect(component.searchbooks.length).toBe(2);
    expect(component.searchbooks[0].title).toBe('Harry Potter');
  }));
 
  //Test case - 10
  it('should show warning message for empty search result', fakeAsync(() => {
    spyOn(toastrService, 'warning');
    component.books = [
      { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
      { id: '2', title: 'Harry',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ];
    dataService.searchText.next("Game of Thrones");
    component.searchFilter();
    tick(1000);
    expect(toastrService.warning).toHaveBeenCalledWith('No Result Were found');
  }));
 
  //Test case - 11
  it('Checking the ngOnDestroy', () => {
    spyOn(dataService.searchDisable, 'next');
    component.ngOnDestroy();
    expect(dataService.searchDisable.next).toHaveBeenCalledWith(false);
  });

  //Test case - 12
  it('Checking the book list when no filters is applied', () => {
    component.books = [
      { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Mystry', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
      { id: '2', title: 'Harry',author: 'JK',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ];
    component.selectedAuthors = [];
    component.selectedGenres = [];
    component.selectedGenres = [];
    component.selectedLanguages = [];
    component.maxPriceValue=-1;
    component.maxPriceValue=1500;
    component.filterBooks();
    expect(component.searchbooks).toEqual(component.books);
  });

  //Test case - 13
  it('Checking the unique items from the Booklist', () => {
    component.books = [
      { id: '1', title: 'Harry Potter',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'},
      { id: '2', title: 'Harry',author: 'Rowling',price: 300,rating: 4,year: 2020,genre: 'Fiction', language: 'English',country: 'US',imageLink: 'https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg',pages: 100,link: 'https://www.amazon.in/Subtle-Art-Not-Giving-Counterintuitive-ebook/dp/B019MMUA8S/ref=sr_1_4?crid=3HJ92AAV1POUY&keywords=books&qid=1700027732&s=digital-text&sprefix=book%2Cdigital-text%2C240&sr=1-4',description: 'Harry Potter and the Philosopher'}
    ];
    
    const uniqueAuthors = component.getUniqueAuthors();
    const uniqueLanguage = component.getUniqueLanguages();
    const uniqueGenres = component.getUniqueGenres();
    const uniqueYears = component.getUniqueYears();

    expect(uniqueAuthors).toEqual(['Rowling']);
    expect(uniqueLanguage).toEqual(['English']);
    expect(uniqueGenres).toEqual(['Fiction']);
    expect(uniqueYears).toEqual([2020]);
  });

  //Test case - 14
  it('Checking toggle div method', () => {
    component.toggleDiv();
    expect(component.isSortDivVisible).toBeTrue();
    component.toggleDiv();
    expect(component.isSortDivVisible).toBeFalse();
  });
  
});