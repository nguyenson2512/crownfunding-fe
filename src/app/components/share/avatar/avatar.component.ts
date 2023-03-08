import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent extends BaseComponent implements OnInit {
  @Input() user = null;
  @Input() isSmSize: boolean = false;

  constructor(componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}

  navigateChat() {
    this.redirect(['/chats']);
  }
}
