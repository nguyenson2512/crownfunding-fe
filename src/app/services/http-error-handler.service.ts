import { HttpException } from './../interfaces/exception.interface';
import { DialogService } from './dialog.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class UnauthenticatedException implements HttpException {
  code = '401';
  message = 'Unauthenticated';
}

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandler {
  constructor(private dialogService: DialogService) {}

  public handle(response: HttpErrorResponse) {
    const body = this.parseJson(response.error);

    if (response.status === 401) {
      return throwError(new UnauthenticatedException());
    }

    if (response.status === 403) {
      this.dialogService.warning('No permission');
    }

    if (body) {
      let message: any = body.message;

      // if (!(message instanceof String)) {
      //   let messages = '';
      //   for (const error in message) {
      //     if (message.hasOwnProperty(error)) {
      //       messages += message[error][0] + '\n';
      //     }
      //   }
      //   message = messages;
      // }
      this.dialogService.warning(message || 'Unknown error');
    }

    return throwError(response);
  }

  private parseJson(json: string): { message?: string } {
    if (typeof json !== 'string') {
      return json;
    }

    try {
      return JSON.parse(json);
    } catch (e) {
      return {};
    }
  }
}
