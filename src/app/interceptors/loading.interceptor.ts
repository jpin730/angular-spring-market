import { HttpEventType, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, tap } from 'rxjs'
import { LoadingService } from '../services/loading.service'

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
  loadingService.incrementRequestCount()
  return next(req).pipe(
    tap(
      ({ type }) =>
        type === HttpEventType.Response &&
        loadingService.decrementRequestCount(),
    ),
    catchError((error) => {
      loadingService.decrementRequestCount()
      throw error
    }),
  )
}
