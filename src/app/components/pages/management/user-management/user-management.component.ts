import { TablePageComponent } from '#components/core/table-page/table-page.component';
import { DatatablePagination } from '#interfaces/pagination.interface';
import { User } from '#models/user.model';
import { ComponentService } from '#services/component.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UserService } from '#services/http/users.service';

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
}
