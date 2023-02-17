import { Injectable } from '@angular/core';
import { BaseSocketService } from './base-socket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  constructor(public socket: BaseSocketService) {}

  sendMessage(event: string, msg: any) {
    this.socket.emit(event, msg);
  }

  getMessage(event: string): Observable<any> {
    return this.socket.fromEvent(event);
  }
}
