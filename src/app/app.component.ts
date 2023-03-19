import { BaseComponent } from '#components/core/base/base.component';
import { LoaderComponent } from '#components/share/loader/loader.component';
import { AuthService } from '#services/auth.service';
import { ComponentService } from '#services/component.service';
import { HomeService } from '#services/home.service';
import { LoaderService } from '#services/loader.service';
import { WebsocketService } from '#services/websocket.service';
import { getAmountCertainElement } from '#utils/helpers';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  spinner = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
  });
  constructor(
    private websocketService: WebsocketService,
    private componentService: ComponentService,
    private overlay: Overlay,
    private homeService: HomeService,
    private loaderService: LoaderService,
    private authService: AuthService
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.websocketService.getMessage('SEND_NOTIFY').subscribe((res) => {
      if (res) {
        const updatedNotificationList = [
          res,
          ...this.homeService.notificationList,
        ];
        this.homeService._notificationList.next(updatedNotificationList);
        this.homeService._amountUnreadNotification.next(
          getAmountCertainElement(updatedNotificationList, 'isRead', false)
        );
      }
    });
    this.subscribeUntilDestroy(
      this.websocketService.getMessage('NEW_MESSAGE'),
      (res) => {
        if (res) {
          if (!this.router.url.includes('chat')) {
            this.componentService.message.showMessage(
              'You have a new message. Please check'
            );
          }
        }
      }
    );

    this.addSpinner();
    this.authService.verifyToken();
  }
  title = 'angular-web';

  private addSpinner() {
    this.subscribeUntilDestroy(this.loaderService.isLoading$, (isLoading) => {
      if (isLoading) {
        setTimeout(() => {
          if (!this.spinner.hasAttached()) {
            this.spinner.attach(new ComponentPortal(LoaderComponent));
          }
        });
      } else {
        setTimeout(() => {
          this.spinner.detach();
        });
      }
    });
  }
}
