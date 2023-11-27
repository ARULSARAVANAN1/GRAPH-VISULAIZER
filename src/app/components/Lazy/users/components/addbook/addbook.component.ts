import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from 'src/app/shared/interfaces/book';
import { BookserviceService } from 'src/app/shared/service/bookservice.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent {
  addbook!: Book;

  constructor(private bookservice: BookserviceService) {}

  postbook() {
    this.bookservice.postbooks(this.addbook).subscribe(
      (books) => {
        alert('Book added');
      },
      (err) => {
        console.log('error happend');
      }
    );
  }
}
