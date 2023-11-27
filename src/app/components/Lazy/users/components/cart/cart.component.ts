import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Cart } from 'src/app/shared/interfaces/cart';
import { AuthserviceService } from 'src/app/shared/service/authservice.service';
import { CartserviceService } from 'src/app/shared/service/cartservice.service';
import { DataserviceService } from 'src/app/shared/service/dataservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartservice: CartserviceService,
    private authservice: AuthserviceService,
    private dataservice: DataserviceService,
    private toastr: ToastrService
  ) {}

  cartItems: Cart[] = [];
  dataSource: any;
  displayedColumns: string[] = ['S.no', 'Book', 'Quantity', 'Cost'];
  userId!: string;
  isFetching:boolean = false;

  ngOnInit(): void {
    // this.userId = this.authservice.userId;
    const userId = sessionStorage.getItem('userId');
    if (userId) this.userId = userId;
    this.getCartItemsByUserId();
  }

  //Calling firebase to fetch the cartitem things
  getCartItemsByUserId() {
    this.isFetching = false;
    this.cartservice
      .getCartItemsByuserId(this.userId)
      .pipe(
        map((res: any) => {
          const items: Cart[] = [];
          for (const key in res) {
            let item: Cart;
            item = res[key];
            item.cartId = key;
            // console.log(item);
            items.push(item);
          }
          return items;
        })
      )
      .subscribe((data) => {
        // console.log(data);
        this.cartItems = data;
        this.dataSource = new MatTableDataSource<Cart>(this.cartItems);
        this.dataservice.cartItems.next(this.cartItems.length);
        this.isFetching = true;
      });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  deleteCartItems(cartId: String) {
    this.cartservice.deleteCartItems(cartId).subscribe(
      (data) => {
        this.toastr.success('Item removed from the cart');
        this.dataservice.cartItems.next(
          this.dataservice.cartItems.getValue.length - 1
        );
        this.getCartItemsByUserId();
      },
      (err) => {
        console.log('Error happened ' + err);
      }
    );
  }
}
