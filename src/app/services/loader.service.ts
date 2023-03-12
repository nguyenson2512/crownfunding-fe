import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private suspend = false;
  private isLoading: Subject<boolean> = new Subject();

  constructor() {}

  get isLoading$() {
    return this.isLoading.asObservable();
  }

  spinnerOn() {
    if (!this.suspend) {
      this.isLoading.next(true);
    }
  }

  spinnerOff() {
    if (!this.suspend) {
      this.isLoading.next(false);
    }
  }

  lock() {
    this.suspend = true;
  }

  unlock() {
    this.suspend = false;
  }
}
