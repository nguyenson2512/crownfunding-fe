import { DataClientService } from '#services/http-client.service';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private dataClientService: DataClientService) {}

  create(body: any): Promise<any> {
    return this.dataClientService
      .post('/payment', body)
      .pipe(
        pluck('result', 'data')
        // map((data: DataSet[]) => {
        //   return data.map((item) => new Notification(item));
        // })
      )
      .toPromise();
  }

  executeOrder(orderId: any, orderInfo: any): Promise<any> {
    return this.dataClientService
      .post('/payment/execute', { orderId, orderInfo })
      .pipe(
        pluck('result', 'data')
        // map((data: DataSet[]) => {
        //   return data.map((item) => new Notification(item));
        // })
      )
      .toPromise();
  }
}
