import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {IProduct} from "../models/product";
import {catchError, delay, Observable, tap, throwError} from "rxjs";
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

  products: IProduct[] = []

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("https://fakestoreapi.com/products", {
      params: new HttpParams({
        fromString: 'limit=5',
      })
    }).pipe(
      tap(products => {
        this.products = products
      }),
      catchError(error => this.errorHandler(error))
    )
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>("https://fakestoreapi.com/products", product).pipe(
      tap(res => this.products.push(res))
    )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
