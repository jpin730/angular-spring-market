import { HttpClient } from '@angular/common/http'
import { Injectable, computed, inject, signal } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { API_URL } from '../constants/api-url.constant'
import { Category } from '../interfaces/category.interface'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient)

  private _categories = signal<Category[]>([])

  categories = computed(() => this._categories())

  private readonly baseUrl = API_URL

  getAllCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.baseUrl}/categories`)
      .pipe(tap((res) => this._categories.set(res)))
  }
}
