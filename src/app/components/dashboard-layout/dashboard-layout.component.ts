import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { PATH } from '../../constants/path.constant'
import { ReplacePipe } from '../../pipes/replace.pipe'
import { MenuSvgComponent } from '../../svgs/menu-svg/menu-svg.component'

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuSvgComponent, ReplacePipe],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  path = PATH
  sideNavOpened = false
}
