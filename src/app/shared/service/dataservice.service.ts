import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  // searchText = new EventEmitter<string>();
  searchText = new BehaviorSubject<string>('');
  cartItems = new BehaviorSubject<number>(0);
  searchDisable = new BehaviorSubject<boolean>(false);
}
