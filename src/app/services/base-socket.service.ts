import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseSocketService extends Socket {
  constructor(private storageService: LocalStorageService) {
    super({
      url: 'http://localhost:3030',
      options: {},
    });
    const token = this.storageService.get('access_token');
    this.ioSocket.auth = { token };
  }
}
