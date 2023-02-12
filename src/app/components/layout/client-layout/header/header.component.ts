import { BaseComponent } from '#components/core/base/base.component';
import { AuthService } from '#services/auth.service';
import { ComponentService } from '#services/component.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class ClientHeaderComponent extends BaseComponent implements OnInit {
  isHandset$: Observable<boolean>;

  constructor(
    private componentService: ComponentService,
    public authService: AuthService
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  logout() {
    this.authService.endSession(false);
    this.redirect(['/login']);
  }

  toggleSidenav(): void {
    this.componentService.layout.toggleSidenav();
  }

  navigateToHome() {
    this.redirect('/');
  }
}
