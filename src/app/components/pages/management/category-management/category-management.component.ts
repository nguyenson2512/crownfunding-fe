import { TablePageComponent } from '#components/core/table-page/table-page.component';
import { Category } from '#models/category.model';
import { ComponentService } from '#services/component.service';
import { CategoryService } from '#services/http/category.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

class CategoryTree extends Category {
  treeStatus: 'expanded' | 'collapsed' | 'loading' | 'disabled';
}

const TreeStatus = {
  loading: '...',
  collapsed: '↑',
  expanded: '↓',
  disabled: '',
};

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent
  extends TablePageComponent<Category>
  implements OnInit
{
  constructor(
    private componentService: ComponentService,
    private cd: ChangeDetectorRef,
    private categoryService: CategoryService
  ) {
    super(componentService);
  }

  ColumnMode = ColumnMode;
  rows: CategoryTree[] = [];

  ngOnInit(): void {
    super.ngOnInit();
    this.subscribeUntilDestroy(this.dataSourceObs, (data: Category[]) => {
      if (data) {
        this.rows = this.fillToTree(data, 'collapsed');
        this.cd.markForCheck();
      }
    });
  }

  fillToTree(
    categories: Category[],
    treeStatus: CategoryTree['treeStatus']
  ): CategoryTree[] {
    return categories.map((item) => {
      const itemWithTree = item as CategoryTree;
      itemWithTree.treeStatus = treeStatus;
      if (!itemWithTree.parentId && !itemWithTree?.subCategories?.length) {
        itemWithTree.treeStatus = 'disabled';
      }
      return itemWithTree;
    });
  }

  requestData() {
    return this.categoryService.getAdminCategoryList();
  }

  getTreeStatus(status: string): string {
    return TreeStatus[status];
  }

  disabledButton(tree): boolean {
    return tree.treeStatus === 'disabled';
  }

  onTreeAction(event) {
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'loading';
      const subCate = this.getSubCategories(row._id);
      row.treeStatus = 'expanded';
      this.rows = [...this.rows, ...subCate];
    } else {
      row.treeStatus = 'collapsed';
      this.rows = this.rows.filter((item) => item.parentId !== row._id);
    }
  }

  getSubCategories(parentId: string): CategoryTree[] {
    const parentCategory: Category = this.rows.find(
      (item) => item._id === parentId
    );
    return this.fillToTree(parentCategory.subCategories, 'disabled');
  }

  async handleDelete(id: number) {
    // const accept = await this.componentService.dialog.confirm(
    //   this.trans('warningMessage.ADM-005_006')
    // );
    // if (accept) {
    //   this.subscribeOnce(this.productCategoryService.delete(id), (res) => {
    //     if (res?.data) {
    //       this.loadDatasource();
    //       this.componentService.message.showMessage(
    //         this.trans('successMessage.ERRMSG_008')
    //       );
    //     }
    //   });
    // }
  }
}
