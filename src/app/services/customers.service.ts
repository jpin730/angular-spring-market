import { HttpClient } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { API_URL } from '../constants/api-url.constant'
import { Customer } from '../interfaces/customer.interface'

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly http = inject(HttpClient)

  private _customers = signal<Customer[]>([])

  customers = computed(() => this._customers())

  private readonly baseUrl = API_URL

  getAllCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${this.baseUrl}/customers`)
      .pipe(tap((res) => this._customers.set(res)))
  }

  createCustomer(customer: Pick<Customer, 'name'>): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, customer)
  }

  updateCustomer(customer: Customer): Observable<null> {
    return this.http.put<null>(`${this.baseUrl}/customers`, customer)
  }

  deleteCustomer(id: number): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/customers/${id}`)
  }
}
