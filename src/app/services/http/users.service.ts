import { User } from '#models/user.model';
import { paginationMapper } from '#utils/helpers';
import { Injectable } from '@angular/core';
import {
  DatatablePagination,
  PaginateOption,
} from '#interfaces/pagination.interface';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { DataClientService } from '#services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataClientService: DataClientService) {}

  getListUser(
    pagination?: PaginateOption
  ): Observable<DatatablePagination<User>> {
    return this.dataClientService
      .get('/users', pagination)
      .pipe(pluck('result', 'data'), paginationMapper(User));
  }

  sendOtpEmail(email: string) {
    return this.dataClientService
      .post('/send-otp-email', { email })
      .pipe(pluck('result', 'data'));
  }

  sendOtpPhone(phoneNumber: string) {
    return this.dataClientService
      .post('/send-otp-phone', { phoneNumber })
      .pipe(pluck('result', 'data'));
  }

  verifyOtpEmail(email: string, otp: string) {
    return this.dataClientService
      .post('/verify-otp-email', { email, otp })
      .pipe(pluck('result', 'data'));
  }

  verifyOtpPhone(requestId: string, otp: string, phoneNumber) {
    return this.dataClientService
      .post('/verify-otp-phone', { requestId, otp, phoneNumber })
      .pipe(pluck('result', 'data'));
  }

  getUserInfo() {
    return this.dataClientService.get('/account').pipe(pluck('result', 'data'));
  }
}
