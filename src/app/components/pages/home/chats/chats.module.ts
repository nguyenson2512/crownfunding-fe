import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsComponent } from './chats.component';
import { ChatsRoutingModule } from './chats-routing.module';
import { ShareModule } from '#components/share/share.module';

@NgModule({
  declarations: [ChatsComponent],
  imports: [CommonModule, ChatsRoutingModule, ShareModule],
})
export class ChatsModule {}
