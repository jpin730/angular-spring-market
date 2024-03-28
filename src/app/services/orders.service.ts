import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { API_URL } from '../constants/api-url.constant'
import { Order, OrderDto } from '../interfaces/order.interface'

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient)

  private _orders = signal<Order[]>([])

  orders = computed(() => this._orders())

  private readonly baseUrl = API_URL

  getAllOrders(customer?: number): Observable<Order[]> {
    const params =
      customer == null
        ? undefined
        : new HttpParams().set('customer', customer.toString())
    return this.http
      .get<Order[]>(`${this.baseUrl}/purchases`, { params })
      .pipe(tap((res) => this._orders.set(res)))
  }

  createOrder(order: OrderDto): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/purchases`, order)
  }

  updateOrder(order: OrderDto): Observable<null> {
    return this.http.put<null>(`${this.baseUrl}/purchases`, order)
  }

  deleteOrder(id: number): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/purchases/${id}`)
  }
}
