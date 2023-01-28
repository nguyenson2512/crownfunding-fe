import { Injectable } from '@angular/core';
import { AppHttpClient } from '../services/http-client.service';

@Injectable()
export class Repository {
  constructor(protected httpClient: AppHttpClient) {}

  protected parseResponse(data: any) {}

  objectToQueryString(obj: any, prefix?: any) {
    const str = [];

    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        const k = prefix ? prefix + '[' + p + ']' : p;
        const v = obj[p];
        str.push(
          v !== null && typeof v === 'object'
            ? this.objectToQueryString(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v)
        );
      }
    }
    return str.join('&');
  }
}
