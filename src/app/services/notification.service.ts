import { Injectable, computed, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notification = signal('')
  private _timeoutId = 0
  private _timeout = 5000

  notification = computed(() => this._notification())

  show(message: string): void {
    this.close()
    this._notification.set(message)
    clearTimeout(this._timeoutId)
    this._timeoutId = setTimeout(
      () => this.close(),
      this._timeout,
    ) as unknown as number
  }

  close(): void {
    this._notification.set('')
    clearTimeout(this._timeoutId)
  }
}
