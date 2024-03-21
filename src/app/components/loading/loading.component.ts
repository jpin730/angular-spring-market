import { Component, inject } from '@angular/core'
import { LoadingService } from '../../services/loading.service'

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  private readonly loading = inject(LoadingService)

  show = this.loading.show
}
