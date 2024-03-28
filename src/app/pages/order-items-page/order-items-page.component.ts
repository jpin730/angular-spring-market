import { CurrencyPipe } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Observable, switchMap, tap } from 'rxjs'
import { OrderItem, OrderItemDto } from '../../interfaces/order-item.interface'
import { OrderItemsService } from '../../services/order-items.service'
import { OrdersService } from '../../services/orders.service'
import { ProductsService } from '../../services/products.service'

interface Filter {
  order?: number
}

@Component({
  selector: 'app-order-items-page',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './order-items-page.component.html',
})
export default class OrderItemsPageComponent implements OnInit {
  private readonly orderItemsService = inject(OrderItemsService)
  private readonly ordersService = inject(OrdersService)
  private readonly productsService = inject(ProductsService)

  items = this.orderItemsService.items
  orders = this.ordersService.orders
  products = this.productsService.products
  editing: OrderItemDto | null = null
  isNew = false
  filter: Filter = {}

  ngOnInit(): void {
    this.orderItemsService.getAllItems().subscribe()
    this.ordersService.getAllOrders().subscribe()
    this.productsService.getAllProducts().subscribe()
  }

  create(): void {
    this.isNew = true
    this.editing = { quantity: 1 }
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    })
  }

  edit(item: OrderItem): void {
    this.isNew = false
    const { product, ...rest } = item
    this.editing = { ...rest, productId: product.id }
  }

  cancel(): void {
    this.editing = null
  }

  save(): void {
    if (!this.editing || !this.editing.productId || !this.editing.purchaseId) {
      return
    }
    const quantity = Math.round(this.editing.quantity)
    if (quantity < 1) {
      this.editing.quantity = 1
      return
    }

    const request: Observable<unknown> = this.isNew
      ? this.orderItemsService.createItem(this.editing)
      : this.orderItemsService.updateItem(this.editing)

    request
      .pipe(
        tap(() => (this.editing = null)),
        switchMap(() => this.orderItemsService.getAllItems(this.filter.order)),
      )
      .subscribe()
  }

  delete(purchaseId: number, productId: number): void {
    this.orderItemsService
      .deleteItem(purchaseId, productId)
      .pipe(
        switchMap(() => this.orderItemsService.getAllItems(this.filter.order)),
      )
      .subscribe()
  }

  filterChanged(): void {
    this.orderItemsService.getAllItems(this.filter.order).subscribe()
  }
}
