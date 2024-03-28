import { CurrencyPipe } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Observable, switchMap, tap } from 'rxjs'
import { Order, OrderDto } from '../../interfaces/order.interface'
import { CustomersService } from '../../services/customers.service'
import { OrdersService } from '../../services/orders.service'

interface Filter {
  customer?: number
}

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './orders-page.component.html',
})
export default class OrdersPageComponent implements OnInit {
  private readonly ordersService = inject(OrdersService)
  private readonly customersService = inject(CustomersService)

  orders = this.ordersService.orders
  customers = this.customersService.customers
  editing: OrderDto | null = null
  filter: Filter = {}

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe()
    this.customersService.getAllCustomers().subscribe()
  }

  create(): void {
    this.editing = {}
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    })
  }

  edit(order: Order): void {
    const { customer, ...rest } = order
    this.editing = { ...rest, customerId: customer.id }
  }

  cancel(): void {
    this.editing = null
  }

  save(): void {
    if (!this.editing || !this.editing.customerId) {
      return
    }

    const request: Observable<unknown> = !this.editing.id
      ? this.ordersService.createOrder(this.editing)
      : this.ordersService.updateOrder(this.editing)

    request
      .pipe(
        tap(() => (this.editing = null)),
        switchMap(() => this.ordersService.getAllOrders(this.filter.customer)),
      )
      .subscribe()
  }

  delete(id: number): void {
    this.ordersService
      .deleteOrder(id)
      .pipe(
        switchMap(() => this.ordersService.getAllOrders(this.filter.customer)),
      )
      .subscribe()
  }

  filterChanged(): void {
    this.ordersService.getAllOrders(this.filter.customer).subscribe()
  }
}
