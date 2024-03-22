import {
  HttpContextToken,
  HttpEventType,
  HttpInterceptorFn,
} from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, tap } from 'rxjs'
import { NotificationService } from '../services/notification.service'

export const SHOW_SUCCESS = new HttpContextToken<boolean>(() => false)

const defaultSuccessfulMethods = ['POST', 'PUT', 'DELETE']

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService)

  const showSuccess = req.context.get(SHOW_SUCCESS)

  return next(req).pipe(
    tap(
      ({ type }) =>
        type === HttpEventType.Response &&
        (showSuccess || defaultSuccessfulMethods.includes(req.method)) &&
        notification.show('Operation completed successfully.'),
    ),
    catchError((error) => {
      notification.show('An error occurred. Please try again.')
      throw error
    }),
  )
}
