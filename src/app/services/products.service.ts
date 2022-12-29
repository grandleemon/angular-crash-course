import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IProduct} from "../models/product";
import {catchError, delay, Observable, throwError} from "rxjs";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("https://fakestoreapi.com/products", {
      params: new HttpParams({
        fromString: 'limit=5',
      })
    }).pipe(
      delay(2000),
      catchError(error => this.errorHandler(error))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
