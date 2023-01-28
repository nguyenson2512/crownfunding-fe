import { Component, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/services/component.service';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  constructor(private componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}

  logout() {}

  toggleSidenav(): void {
    this.componentService.layout.toggleSidenav();
  }

  toMyAccount(): void {
    // this.service.router.navigate(['/my-account']);
  }
}
