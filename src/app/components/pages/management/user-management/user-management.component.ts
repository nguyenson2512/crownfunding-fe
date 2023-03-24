import { TablePageComponent } from '#components/core/table-page/table-page.component';
import { UserDialogComponent } from '#components/share/user-dialog/user-dialog.component';
import { DatatablePagination } from '#interfaces/pagination.interface';
import { User } from '#models/user.model';
import { ComponentService } from '#services/component.service';
import { UserService } from '#services/http/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent
  extends TablePageComponent<User>
  implements OnInit
{
  ColumnMode = ColumnMode;

  formSearch = this.fb.group({
    username: '',
  });
  constructor(
    componentService: ComponentService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    super(componentService);
  }

  protected requestData(): Observable<DatatablePagination<User>> | any {
    return this.userService.getListUser(this.paginateOption);
  }

  handleSearch(): void {
    const { username } = this.formSearch.value;

    const searchUser = {
      like: {
        name: username,
      },
    };
    this.onSearch(searchUser);
  }

  handleReset() {
    this.formSearch.setValue({
      username: '',
    });
    this.resetSearch();
  }

  openDetailDialog(user) {
    this.dialogService.showDialog(UserDialogComponent, {
      data: user,
      height: '450px',
      width: '600px',
    });
  }
}
