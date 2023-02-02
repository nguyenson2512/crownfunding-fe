import { ComponentService } from '#services/component.service';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'app-fragment',
})
export class FragmentComponent implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();
  protected session$: Subject<void>;

  constructor(protected service: ComponentService) {}

  ngOnInit(): void {}

  protected get dialogService() {
    return this.service.dialog;
  }

  protected get translateService() {
    return this.service.translate;
  }

  trans(message: string): string {
    return this.translateService.translate(message);
  }

  ngOnDestroy() {
    this.preDestroy();
    this.doDestroy();
  }

  protected preDestroy() {}

  private doDestroy() {
    if (this.session$ && !this.session$.closed) {
      this.session$.next();
      this.session$.complete();
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  protected subscribeOnce<T>(
    observable$: Observable<T>,
    callback: (data: T) => void
  ) {
    return observable$.pipe(take(1)).subscribe((data) => callback(data));
  }

  protected subscribeUntilDestroy<T>(
    observable$: Observable<T>,
    callback: (data: T) => void
  ) {
    return observable$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => callback(data));
  }

  protected reCreateSession(): Subject<void> {
    if (this.session$ && !this.session$.closed) {
      this.session$.next();
      this.session$.complete();
    }

    this.session$ = new Subject<void>();
    return this.session$;
  }
}
