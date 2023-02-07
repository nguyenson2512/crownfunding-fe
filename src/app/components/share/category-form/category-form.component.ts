import { BaseComponent } from '#components/core/base/base.component';
import { CategoryAddEditComponent } from '#components/pages/management/category-management/category-add-edit/category-add-edit.component';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { CategoryService } from '#services/http/category.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { notEmpty } from 'src/app/validators/not-empty.validator';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent extends BaseComponent implements OnInit {
  categoryForm = this.fb.group({
    name: ['', [Validators.required, notEmpty]],
    isActive: [true],
    parentId: [null],
  });

  isEdit: boolean = false;
  _categoryDetail: Category;
  isSubCategory: boolean = false;
  parentCategories$: Observable<Category[]>;

  @Input() set categoryDetail(value: Category) {
    this._categoryDetail = value;
    if (value?._id) {
      this.isEdit = true;
      this.categoryForm.patchValue(value);
    }
  }

  get jobCategoryDetail(): Category {
    return this._categoryDetail;
  }

  @Output() formComplete = new EventEmitter();

  constructor(
    componentService: ComponentService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryAddEditComponent>
  ) {
    super(componentService);
  }

  ngOnInit(): void {
    this.parentCategories$ = this.categoryService.getParentCategories();
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    const { name, isActive, parentId } = this.categoryForm.value;

    this.formComplete.emit({
      _id: this._categoryDetail?._id,
      name,
      isActive,
      parentId: parentId || null,
    });
  }

  changeSubCategory() {
    this.isSubCategory = !this.isSubCategory;
  }
}
