import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
import { CategoryFormComponent } from './category-form/category-form.component';
import { DialogComponent } from '#components/core/dialog/dialog.component';
import { CommentItemComponent } from './comment-item/comment-item.component';
import { ReplyItemComponent } from './reply-item/reply-item.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { CopyPasteBlockDirective } from 'src/app/directives/copy-paste-block.directive';
import { QuillModule } from 'ngx-quill';
import { EscapeHtmlPipe } from '#pipes/keep-html.pipe';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { TruncateTextPipe } from '#pipes/truncate-text.pipe';
import { ImageViewComponent } from './image-view/image-view.component';
import { RewardCardComponent } from './reward-card/reward-card.component';
import { RewardFormComponent } from './reward-form/reward-form.component';

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
  MatChipsModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatAutocompleteModule,
];

const SHARE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgxDatatableModule,
  QuillModule,
  ...MATERIAL_MODULES,
];

const COMPONENTS = [
  ConfirmDialogComponent,
  WarningDialogComponent,
  ValidationErrorComponent,
  DialogComponent,
  CategoryFormComponent,
  PageHeaderComponent,
  TranslatePipe,
  EscapeHtmlPipe,
  TruncateTextPipe,
  NgxDatatableEmptyRowDirective,
  CommentItemComponent,
  ReplyItemComponent,
  CommentFormComponent,
  CopyPasteBlockDirective,
  CampaignFormComponent,
  RewardCardComponent,
  ImageViewComponent,
  RewardFormComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...SHARE_MODULES],
  exports: [...SHARE_MODULES, ...COMPONENTS],
})
export class ShareModule {}
