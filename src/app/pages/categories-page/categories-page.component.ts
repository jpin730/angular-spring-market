import { Component, OnInit, inject } from '@angular/core'
import { CategoriesService } from '../../services/categories.service'

@Component({
  selector: 'app-categories-page',
  standalone: true,
  templateUrl: './categories-page.component.html',
})
export default class CategoriesPageComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)

  categories = this.categoriesService.categories

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe()
  }
}
