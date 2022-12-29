import { Component } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  title = 'angular-project'
  loading = false
  term = ''

  constructor(public productsService: ProductsService, public modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.productsService.getAllProducts().subscribe(() => {
      this.loading = false
    })
  }
}
