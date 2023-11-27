import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from '../users.component';
import { AddbookComponent } from '../components/addbook/addbook.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { BooksComponent } from '../components/books/books.component';
import { HomeComponent } from '../components/home/home.component';
import { BookdetailsComponent } from '../components/bookdetails/bookdetails.component';
import { CartComponent } from '../components/cart/cart.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { authguardGuard } from 'src/app/shared/guard/authguard.guard';

const routes: Routes = [
    { path: '', component: UsersComponent,
    children:[
        {path:"addbook",component:AddbookComponent },
        {path:"",component:HomeComponent },
        {path:"home",component:HomeComponent},
        {path:"profile",component:ProfileComponent},
        {path:"books",component:BooksComponent},
        {path:"book/:id",component:BookdetailsComponent},
        {path:"cart",component:CartComponent},
        {path:"cart/:id",component:CartComponent},
        {path:"navbar",component:NavbarComponent}
      ],canActivate:[authguardGuard]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
