import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { loadingInterceptor } from './interceptors/loading.interceptor'
import { notificationInterceptor } from './interceptors/notification.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([loadingInterceptor, notificationInterceptor]),
    ),
  ],
}
