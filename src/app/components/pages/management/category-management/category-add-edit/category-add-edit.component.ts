import { BaseComponent } from '#components/core/base/base.component';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { CategoryService } from '#services/http/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-add-edit',
  templateUrl: './category-add-edit.component.html',
  styleUrls: ['./category-add-edit.component.scss'],
})
export class CategoryAddEditComponent extends BaseComponent implements OnInit {
  constructor(
    private componentService: ComponentService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public categoryDetail: Category
  ) {
    super(componentService);
  }

  ngOnInit(): void {}

  onSubmit(category: Category) {
    const handle = category?._id
      ? this.categoryService.edit(category)
      : this.categoryService.create(category);

    const message = category?._id
      ? 'successMessage.ERRMSG_013'
      : 'successMessage.ERRMSG_011';

    this.subscribeOnce(handle, (res) => {
      this.componentService.message.showMessage(this.trans(message));
      this.dialogRef.close(res);
    });
  }
}
