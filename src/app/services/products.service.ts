import { HttpClient } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { API_URL } from '../constants/api-url.constant'
import { Product, ProductDto } from '../interfaces/product.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient)

  private _products = signal<Product[]>([])

  products = computed(() => this._products())

  private readonly baseUrl = API_URL

  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/products`)
      .pipe(tap((res) => this._products.set(res)))
  }

  createProduct(product: ProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product)
  }

  updateProduct(product: ProductDto): Observable<null> {
    return this.http.put<null>(`${this.baseUrl}/products`, product)
  }

  deleteProduct(id: number): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/products/${id}`)
  }
}
