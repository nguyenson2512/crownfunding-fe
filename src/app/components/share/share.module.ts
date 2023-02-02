import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { WarningDialogComponent } from './dialog/warning-dialog/warning-dialog.component';
import { ValidationErrorComponent } from '../core/validation-error/validation-error.component';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '#pipes/translate.pipe';
import { PageHeaderComponent } from './page-header/page-header.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDatatableEmptyRowDirective } from 'src/app/directives/ngx-datatable-empty-row.directive';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
];

const SHARE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgxDatatableModule,
  ...MATERIAL_MODULES,
];

const COMPONENTS = [
  ConfirmDialogComponent,
  WarningDialogComponent,
  ValidationErrorComponent,
  PageHeaderComponent,
  TranslatePipe,
  NgxDatatableEmptyRowDirective,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...SHARE_MODULES],
  exports: [...SHARE_MODULES, ...COMPONENTS],
})
export class ShareModule {}
