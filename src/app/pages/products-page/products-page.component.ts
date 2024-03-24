import { CurrencyPipe } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Observable, switchMap, tap } from 'rxjs'
import { Product, ProductDto } from '../../interfaces/product.interface'
import { CategoriesService } from '../../services/categories.service'
import { ProductsService } from '../../services/products.service'

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './products-page.component.html',
})
export default class ProductsPageComponent implements OnInit {
  private readonly productsService = inject(ProductsService)
  private readonly categoriesService = inject(CategoriesService)

  products = this.productsService.products
  categories = this.categoriesService.categories
  editing: ProductDto | null = null

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe()
  }

  create(): void {
    this.editing = { name: '', price: 0 }
    this.categoriesService.getAllCategories().subscribe(() =>
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      }),
    )
  }

  edit(product: Product): void {
    const { category, ...rest } = product
    this.editing = { ...rest, categoryId: category.id }
    this.categoriesService.getAllCategories().subscribe()
  }

  cancel(): void {
    this.editing = null
  }

  save(): void {
    if (!this.editing || !this.editing.categoryId) {
      return
    }

    const request: Observable<unknown> = !this.editing.id
      ? this.productsService.createProduct(this.editing)
      : this.productsService.updateProduct(this.editing)

    request
      .pipe(
        tap(() => (this.editing = null)),
        switchMap(() => this.productsService.getAllProducts()),
      )
      .subscribe()
  }

  delete(id: number): void {
    this.productsService
      .deleteProduct(id)
      .pipe(switchMap(() => this.productsService.getAllProducts()))
      .subscribe()
  }
}
