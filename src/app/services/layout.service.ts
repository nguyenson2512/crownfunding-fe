import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private isToggleSidenav = new Subject<Date>();
  isToggleSideContent$ = this.isToggleSidenav.asObservable();
  activeBreakpoints: string[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSidenav(): void {
    this.isToggleSidenav.next(new Date());
  }
}
