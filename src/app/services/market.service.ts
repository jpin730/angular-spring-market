import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { API_URL } from '../constants/api-url.constant'

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private readonly http = inject(HttpClient)

  private readonly baseUrl = API_URL

  reset(): Observable<null> {
    return this.http.get<null>(`${this.baseUrl}/reset`)
  }
}
