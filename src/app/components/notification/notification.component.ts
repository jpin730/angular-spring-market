import { Component, computed, inject } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matCloseOutline } from '@ng-icons/material-icons/outline'
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './notification.component.html',
  viewProviders: [provideIcons({ matCloseOutline })],
})
export class NotificationComponent {
  private readonly notification = inject(NotificationService)

  message = this.notification.notification
  show = computed(() => this.message() !== '')

  close(): void {
    this.notification.close()
  }
}
