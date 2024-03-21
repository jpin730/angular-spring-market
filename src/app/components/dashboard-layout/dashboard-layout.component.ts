import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matMenuOutline } from '@ng-icons/material-icons/outline'
import { PATH } from '../../constants/path.constant'
import { ReplacePipe } from '../../pipes/replace.pipe'

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent, ReplacePipe],
  templateUrl: './dashboard-layout.component.html',
  viewProviders: [provideIcons({ matMenuOutline })],
})
export class DashboardLayoutComponent {
  path = PATH
  sideNavOpened = false
}
