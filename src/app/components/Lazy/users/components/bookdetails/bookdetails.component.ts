import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { BookserviceService } from 'src/app/shared/service/bookservice.service';
import { CartserviceService } from 'src/app/shared/service/cartservice.service';
import { Review } from 'src/app/shared/interfaces/review';
import { Book } from 'src/app/shared/interfaces/book';
import { Cart } from 'src/app/shared/interfaces/cart';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
  providers: [],
})
export class BookdetailsComponent implements OnInit {
  book!: Book;
  review!: Review;
  reviews: Review[] = [];
  shuffledReviews: Review[] = [];
  bookId: string = '';

  hours: number = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  words: number = Math.floor(Math.random() * (500 - 100 + 1)) + 100;

  constructor(
    private route: ActivatedRoute,
    private bookservice: BookserviceService,
    private cartservice: CartserviceService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    // console.log(this.bookId);
    this.bookservice.getBookById(this.bookId).subscribe((data) => {
      this.book = data;
      this.book.id = this.bookId;
      // console.log(this.book);
    });
    this.getReviews();
  }

  getReviews() {
    this.bookservice
      .getBookReviews()
      .pipe(
        map((res: any) => {
          const reviews: Review[] = [];
          for (const key in res) {
            reviews.push(res[key]);
          }
          return reviews;
        })
      )
      .subscribe((data) => {
        // console.log(data);
        this.reviews = data;
        this.shuffledReviews = this.shuffleArray(this.reviews);
      });
  }

  // addreview()
  // {
  //    this.review.user = "Tsengererai Hlahla",
  //    this.review.rating = 1;
  //    this.review.comment = "I bought this book anticipating a great page turner with a lot of incite into my African roots however I had to stop 1/4 of the way in as the story line kept going round in circles between the yum harvest and the volatile temperament of the main character."
  //    this.bookservice.postReviews(this.review);
  //    alert("review added");
  // }

  //Shuffling the reviews List
  shuffleArray<Review>(array: Review[]): Review[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
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
}
