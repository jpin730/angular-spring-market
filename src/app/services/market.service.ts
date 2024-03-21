import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  private readonly baseUrl =
    'https://java-spring-market.onrender.com/api/products'
}
