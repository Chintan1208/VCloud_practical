import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../interface/product';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private apiServer = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient, private spinner: NgxSpinnerService) {}

  create(product: any): Observable<Product> {
    return this.httpClient
      .post<Product>(
        this.apiServer + '/products/',
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  getById(id: any): Observable<Product> {
    return this.httpClient
      .get<Product>(this.apiServer + '/products/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiServer + '/products/')
      .pipe(catchError(this.errorHandler));
  }

  update(id: any, product: any): Observable<Product> {
    return this.httpClient
      .put<Product>(
        this.apiServer + '/products/' + id,
        JSON.stringify(product),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: any) {
    return this.httpClient
      .delete<Product>(this.apiServer + '/products/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  showSpinner(){
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1200);
  }
}
