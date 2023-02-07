import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ComponentService } from 'src/app/services/component.service';
import { take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'app-base',
})
export class BaseComponent implements OnInit {
  protected destroy$ = new Subject<void>();
  protected session$: Subject<void>;
  constructor(protected service: ComponentService) {}

  ngOnInit(): void {}

  trans(message: string): string {
    return this.service.translate.translate(message);
  }

  protected get router() {
    return this.service.router;
  }

  public get activatedRoute(): ActivatedRoute {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  protected get queryParams() {
    return this.activatedRoute.queryParams;
  }

  protected get routeParams(): Params {
    return this.activatedRoute.snapshot.params;
  }

  protected get dialogService() {
    return this.service.dialog;
  }

  protected redirect(path: any, queryParams?: any, replaceUrl = false) {
    const commands = path instanceof Array ? path : [path];
    this.router.navigate(commands, { queryParams, replaceUrl });
  }

  protected reCreateSession(): Subject<void> {
    if (this.session$ && !this.session$.closed) {
      this.session$.next();
      this.session$.complete();
    }

    this.session$ = new Subject<void>();
    return this.session$;
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
}
