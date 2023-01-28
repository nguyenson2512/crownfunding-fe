import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() show: boolean;
  @Input() position: string;
  showPopupMessage: boolean;
  message: string;
  subscription: Subscription;
  popupSubscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    if (this.position === 'popup') {
      this.popupSubscription = this.messageService.showPopupMessage$.subscribe(
        (status) => {
          if (status) {
            this.show = true;
            this.message = this.messageService.message;
          } else {
            this.show = false;
          }
        }
      );
    } else {
      this.subscription = this.messageService.isDisplay$.subscribe((status) => {
        if (status) {
          this.show = true;
          this.message = this.messageService.message;
        } else {
          this.show = false;
        }
      });
    }
  }
}
