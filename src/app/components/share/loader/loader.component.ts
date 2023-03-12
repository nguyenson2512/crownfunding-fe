import { BaseComponent } from '#components/core/base/base.component';
import { ComponentService } from '#services/component.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent extends BaseComponent implements OnInit {
  constructor(componentService: ComponentService) {
    super(componentService);
  }

  ngOnInit(): void {}
}
