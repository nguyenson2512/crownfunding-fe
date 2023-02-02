import { FragmentComponent } from '#components/core/fragment/fragment.component';
import { ComponentService } from '#services/component.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent extends FragmentComponent implements OnInit {
  @Input() title: string;

  constructor(componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}
}
