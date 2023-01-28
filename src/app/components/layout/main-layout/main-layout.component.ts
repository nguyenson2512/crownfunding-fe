import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ComponentService } from 'src/app/services/component.service';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent extends BaseComponent implements OnInit {
  isHandset$: Observable<boolean>;
  isMinimized = false;
  constructor(
    private componentService: ComponentService,
    private breakpointObserver: BreakpointObserver
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay({
        bufferSize: 1,
        refCount: true,
      })
    );

    this.subscribeUntilDestroy(
      this.componentService.layout.isToggleSideContent$,
      () => {
        this.toggleSidenav();
      }
    );
  }

  private toggleSidenav(): void {
    this.isMinimized = !this.isMinimized;
    // Force window resize event to trigger some elements re-calculate
    if (typeof Event === 'function') {
      setTimeout(() => {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }
}
