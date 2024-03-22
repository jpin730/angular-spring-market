import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { switchMap, tap } from 'rxjs'
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

  edit(category: Category): void {
    this.editing = structuredClone(category)
  }

  save(): void {
    if (!this.editing) {
      return
    }
    this.categoriesService
      .updateCategory(this.editing)
      .pipe(
        tap(() => (this.editing = null)),
        switchMap(() => this.categoriesService.getAllCategories()),
      )
      .subscribe()
  }

  cancel(): void {
    this.editing = null
  }
}
