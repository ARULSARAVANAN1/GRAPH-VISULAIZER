import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataserviceService {
  // searchText = new EventEmitter<string>();
  fileUploaded = new BehaviorSubject<string>('');
}
