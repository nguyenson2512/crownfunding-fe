import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from '../../share/share.module';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [HomeComponent, CategoryListComponent],
  imports: [CommonModule, HomeRoutingModule, ShareModule],
})
export class HomeModule {}
