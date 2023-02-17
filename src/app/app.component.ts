import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { HomeService } from '#services/home.service';
import { WebsocketService } from '#services/websocket.service';
import { getAmountCertainElement } from '#utils/helpers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  constructor(
    private websocketService: WebsocketService,
    componentService: ComponentService,
    private homeService: HomeService
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
  }
  title = 'angular-web';
}
