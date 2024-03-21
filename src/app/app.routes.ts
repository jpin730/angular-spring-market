import { Routes } from '@angular/router'
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component'
import { PATH } from './constants/path.constant'

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: PATH.CATEGORIES,
        loadComponent: () =>
          import('./pages/categories-page/categories-page.component'),
      },
      {
        path: PATH.CUSTOMERS,
        loadComponent: () =>
          import('./pages/customers-page/customers-page.component'),
      },
      {
        path: PATH.HOME,
        loadComponent: () => import('./pages/home-page/home-page.component'),
      },
      {
        path: PATH.ORDER_ITEMS,
        loadComponent: () =>
          import('./pages/order-items-page/order-items-page.component'),
      },
      {
        path: PATH.ORDERS,
        loadComponent: () =>
          import('./pages/orders-page/orders-page.component'),
      },
      {
        path: PATH.PRODUCTS,
        loadComponent: () =>
          import('./pages/products-page/products-page.component'),
      },
      {
        path: '**',
        redirectTo: PATH.HOME,
      },
    ],
  },
]
