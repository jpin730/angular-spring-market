import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { API_URL } from '../constants/api-url.constant'
import { OrderItem, OrderItemDto } from '../interfaces/order-item.interface'
import { Order } from '../interfaces/order.interface'

@Injectable({
  providedIn: 'root',
})
export class OrderItemsService {
  private readonly http = inject(HttpClient)

  private _items = signal<OrderItem[]>([])

  items = computed(() => this._items())

  private readonly baseUrl = API_URL

  getAllItems(order?: number): Observable<OrderItem[]> {
    const params =
      order == null
        ? undefined
        : new HttpParams().set('purchase', order.toString())
    return this.http
      .get<OrderItem[]>(`${this.baseUrl}/purchase-items`, { params })
      .pipe(tap((res) => this._items.set(res)))
  }

  createItem(item: OrderItemDto): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/purchase-items`, item)
  }

  updateItem(item: OrderItemDto): Observable<null> {
    return this.http.put<null>(`${this.baseUrl}/purchase-items`, item)
  }

  deleteItem(purchase: number, product: number): Observable<null> {
    const params = new HttpParams()
      .set('purchase', purchase.toString())
      .set('product', product.toString())
    return this.http.delete<null>(`${this.baseUrl}/purchase-items`, { params })
  }
}
