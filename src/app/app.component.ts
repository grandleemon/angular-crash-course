import {Component, OnInit} from '@angular/core';
import {IProduct} from "./models/product";
import {ProductsService} from "./services/products.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-project'
  // products: IProduct[] = []
  loading = false
  products$: Observable<IProduct[]>
  term = ''

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.products$ = this.productsService.getAllProducts().pipe(
      tap(() => this.loading = false)
    )
    // this.productsService.getAllProducts().subscribe(products => {
    //   this.products = products
    //   this.loading = false
    // })
  }
}
