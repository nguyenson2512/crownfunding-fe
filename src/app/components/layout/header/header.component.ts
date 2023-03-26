import { UserDialogComponent } from '#components/share/user-dialog/user-dialog.component';
import { AuthService } from '#services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  constructor(
    private componentService: ComponentService,
    private authService: AuthService
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  logout() {
    this.authService.endSession();
    this.redirect(['/login']);
  }

  toggleSidenav(): void {
    this.componentService.layout.toggleSidenav();
  }

  toMyAccount(): void {
    this.authService.isLogInUser();
    const currentUser = this.authService.currentUser$.getValue();

    this.dialogService.showDialog(UserDialogComponent, {
      data: { ...currentUser, myAccount: true },
      height: '450px',
      width: '600px',
    });
  }
}
