import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { PATH } from '../../constants/path.constant'
import { ReplacePipe } from '../../pipes/replace.pipe'
import { MarketService } from '../../services/market.service'

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ReplacePipe],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private readonly marketService = inject(MarketService)

  path = PATH

  resetData(): void {
    this.marketService.reset().subscribe()
  }
}
