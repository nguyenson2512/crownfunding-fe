import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LocalStorageService } from './storage.service';
import { MessageService } from './message.service';
import { DialogService } from './dialog.service';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  constructor(
    public router: Router,
    public localStorage: LocalStorageService,
    public message: MessageService,
    public dialog: DialogService,
    public location: Location,
    public layout: LayoutService
  ) {}
}
