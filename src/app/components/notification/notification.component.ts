import { Component, computed, inject } from '@angular/core'
import { NotificationService } from '../../services/notification.service'
import { CloseSvgComponent } from '../../svgs/close-svg/close-svg.component'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CloseSvgComponent],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  private readonly notification = inject(NotificationService)

  message = this.notification.notification
  show = computed(() => this.message() !== '')

  close(): void {
    this.notification.close()
  }
}
