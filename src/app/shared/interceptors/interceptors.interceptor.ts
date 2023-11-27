import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterceptorsInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(request);
    return next.handle(request).pipe(
      catchError((error:any) => {
        if(error instanceof HttpErrorResponse)
        {
          if (error.status === 500) {
            this.toastr.error('Server is busy. Please try again later.');
          }
          else if(error.status === 404)
          {
            this.toastr.error('Resource not found.');
          }
          else {
            this.toastr.error('An error occurred. Please try again.');
          }
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
