import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LoadingComponent } from './components/loading/loading.component'
import { NotificationComponent } from './components/notification/notification.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent, NotificationComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
