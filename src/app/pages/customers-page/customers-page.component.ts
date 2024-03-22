import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Observable, switchMap, tap } from 'rxjs'
import { Customer } from '../../interfaces/customer.interface'
import { CustomersService } from '../../services/customers.service'

@Component({
  selector: 'app-customers-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customers-page.component.html',
})
export default class CustomersPageComponent implements OnInit {
  private readonly customersService = inject(CustomersService)

  customers = this.customersService.customers
  editing: Customer | null = null

  ngOnInit(): void {
    this.customersService.getAllCustomers().subscribe()
  }

  create(): void {
    this.editing = { name: '', id: 0 }
  }

  edit(customer: Customer): void {
    this.editing = structuredClone(customer)
  }

  cancel(): void {
    this.editing = null
  }

  save(): void {
    if (!this.editing) {
      return
    }

    const request: Observable<unknown> =
      this.editing.id === 0
        ? this.customersService.createCustomer(this.editing)
        : this.customersService.updateCustomer(this.editing)

    request
      .pipe(
        tap(() => (this.editing = null)),
        switchMap(() => this.customersService.getAllCustomers()),
      )
      .subscribe()
  }

  delete(id: number): void {
    this.customersService
      .deleteCustomer(id)
      .pipe(switchMap(() => this.customersService.getAllCustomers()))
      .subscribe()
  }
}
