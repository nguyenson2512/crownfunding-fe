import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { ShareModule } from '#components/share/share.module';
import { WishlistRoutingModule } from './wishlist-routing.module';

@NgModule({
  declarations: [WishlistComponent],
  imports: [CommonModule, WishlistRoutingModule, ShareModule],
})
export class WishlistModule {}
