import { Injectable, computed, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _requestCount = signal(0)

  show = computed(() => this._requestCount() > 0)

  incrementRequestCount(): void {
    this._requestCount.update((value) => value + 1)
  }

  decrementRequestCount(): void {
    this._requestCount.update((value) => value - 1)
  }
}
