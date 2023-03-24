import { BaseComponent } from '#components/core/base/base.component';
import { User } from '#models/user.model';
import { ComponentService } from '#services/component.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent extends BaseComponent implements OnInit {
  @Input() user: User;
  constructor(componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}

  getRoles(roles) {
    return roles?.map((role) => role.name).join(', ');
  }

  navigateChat(id) {
    this.redirect(['/chats']);
  }
}
