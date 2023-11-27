import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from '../users.component';
import { AddbookComponent } from '../components/addbook/addbook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../components/home/home.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { BooksComponent } from '../components/books/books.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BookdetailsComponent } from '../components/bookdetails/bookdetails.component';
import { CartComponent } from '../components/cart/cart.component';
import { AngularmaterialModule } from 'src/app/modules/angularmaterial.module';
import { StarRatingModule } from 'angular-star-rating';
import { HoverDirective } from 'src/app/shared/directive/hover.directive';


@NgModule({
  declarations: [
    UsersComponent,
    AddbookComponent,
    HomeComponent,
    NavbarComponent,
    BooksComponent,
    ProfileComponent,
    BookdetailsComponent,
    CartComponent,
    HoverDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularmaterialModule,
    UsersRoutingModule,
    StarRatingModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
