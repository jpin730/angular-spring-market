import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Observable, switchMap, tap } from 'rxjs'
import { Category } from '../../interfaces/category.interface'
import { CategoriesService } from '../../services/categories.service'

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories-page.component.html',
})
export default class CategoriesPageComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)

  categories = this.categoriesService.categories
  editing: Category | null = null

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe()
  }

  create(): void {
    this.editing = { name: '', id: 0 }
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
    })
  }

  edit(category: Category): void {
    this.editing = structuredClone(category)
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
        ? this.categoriesService.createCategory(this.editing)
        : this.categoriesService.updateCategory(this.editing)

    request
      .pipe(
        tap(() => (this.editing = null)),
        switchMap(() => this.categoriesService.getAllCategories()),
      )
      .subscribe()
  }

  delete(id: number): void {
    this.categoriesService
      .deleteCategory(id)
      .pipe(switchMap(() => this.categoriesService.getAllCategories()))
      .subscribe()
  }
}
