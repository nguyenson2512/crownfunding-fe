import { BaseComponent } from '#components/core/base/base.component';
import { AuthService } from '#services/auth.service';
import { ComponentService } from '#services/component.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '#models/notification.model';
import { NotificationService } from '#services/http/notification.service';
import { HomeService } from '#services/home.service';
import {
  DATETIME_FORMAT,
  NOTIFICATION_INFO_MAP,
  NOTIFICATION_NAVIGATOR,
} from '#utils/const';

@Component({
  selector: 'app-client-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class ClientHeaderComponent extends BaseComponent implements OnInit {
  isHandset$: Observable<boolean>;
  notificationList$: Observable<Notification[]>;
  dateTime: string = DATETIME_FORMAT;
  NOTIFICATION_NAVIGATOR = NOTIFICATION_NAVIGATOR;
  NOTIFICATION_INFO_MAP = NOTIFICATION_INFO_MAP;

  constructor(
    private componentService: ComponentService,
    public authService: AuthService,
    public notificationService: NotificationService,
    public homeService: HomeService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.authService.isLogInUser();
    const user = this.authService.currentUser$.getValue();
    if (user) {
      this.notificationList$ = this.homeService.getNotificationList();
    }
  }

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

  handleSeen(notification: Notification) {
    if (!notification.isRead) {
      this.homeService.seenNotification([notification?._id]);
    }
    let redirectUrl = '';
    // const notificationInfo = NOTIFICATION_INFO_MAP[notification?.object];
    // if (typeof notificationInfo?.redirect === 'function') {
    //   redirectUrl = notificationInfo.redirect(notification?.object_id);
    // } else {
    //   redirectUrl = notificationInfo?.redirect;
    // }
    if (!redirectUrl) {
      redirectUrl = NOTIFICATION_NAVIGATOR[notification?.title];
    }
    this.redirect([redirectUrl || '/admin']);
  }
}
