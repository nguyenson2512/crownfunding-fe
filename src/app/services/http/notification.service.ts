import { Notification } from '#models/notification.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';
import { DataClientService, DataSet } from '#services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private dataClientService: DataClientService) {}

  getList(): Observable<Notification[]> {
    return this.dataClientService.get('/notifications').pipe(
      shareReplay(),
      pluck('result', 'data'),
      map((data: DataSet[]) => {
        return data.map((item) => new Notification(item));
      })
    );
  }

  seenNotification(ids: string[]): Observable<Notification> {
    return this.dataClientService.put('/notifications/seen', { ids }).pipe(
      pluck('result', 'data'),
      map((res: DataSet) => new Notification(res))
    );
  }
}
