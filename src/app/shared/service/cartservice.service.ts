import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthserviceService } from './authservice.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from './dataservice.service';
import { Cart } from '../interfaces/cart';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  userId: string = "";
  constructor(private database: AngularFireDatabase,
    private http: HttpClient,
    private toastr: ToastrService,
    private dataservice: DataserviceService,
    private router:Router) {
    const userId = sessionStorage.getItem('userId');
    if (userId)
      this.userId = userId;
  }

  addCartItem(newitem: Cart) {
    //Getting the cartItems from the Database
    this.getCartItemsByuserId(this.userId).pipe(map((res: any) => {
      const items: Cart[] = [];
      for (const key in res) {
        items.push(res[key]);
      }
      return items;
    }))
      .subscribe(data => {
        console.log(data);
        const cartItems: Cart[] = data;
        this.verifyDuplicateItems(newitem, cartItems);
      });
  }

  verifyDuplicateItems(newitem: Cart, cartItems: Cart[]) {
    // console.log(newitem);
    const bookId = newitem.book.id;
    const foundItem = cartItems.find((items) => items.book.id === bookId);

    if (foundItem) {
      this.toastr.warning("This Book already added to the cart");
    }
    else {
      cartItems.push(newitem);
      this.addCartItemsToFirebase(cartItems);
      //console.log(cartItems.length);
      this.dataservice.cartItems.next(cartItems.length);
      this.toastr.success("Book added to the cart");
    }
  }

  addCartItemsToFirebase(cartItems: Cart[]) {
    const userId = this.userId;
    const Path = `cartItems/${userId}`;

    this.database.list(Path).remove().then(() => {
      cartItems.forEach((cartItem, index) => {
        this.database.list(Path).push(cartItem).then(data => {
          this.router.navigate(['/user/cart']);
        })
        .catch(error => {
          console.error('Error adding cart item to Firebase database:', error);
        });
      });
    }).catch(error => {
      console.error('Error clearing existing cart items:', error);
    });
  }

  //get the data from fireBase
  getCartItemsByuserId(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>('https://login-register-1948f-default-rtdb.firebaseio.com/cartItems/' + userId + '/.json');
  }


  //Get the cartItems from the database
  deleteCartItems(cartId: String) {
    const userId = this.userId;
    return this.http.delete('https://login-register-1948f-default-rtdb.firebaseio.com/cartItems/' + userId + '/' + cartId + '/.json');
  }

}
