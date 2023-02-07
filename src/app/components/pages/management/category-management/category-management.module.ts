import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementComponent } from './category-management.component';
import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { ShareModule } from '#components/share/share.module';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';

@NgModule({
  declarations: [CategoryManagementComponent, CategoryAddEditComponent],

  imports: [CommonModule, CategoryManagementRoutingModule, ShareModule],
})
export class CategoryManagementModule {}
