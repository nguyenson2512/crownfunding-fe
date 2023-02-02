import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpErrorHandler } from './http-error-handler.service';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from './storage.service';
import { environment } from '../../environments/environment';
import { URLEncoder } from '#utils/url-encoder';
import { isNullOrUndefined, isStrEmpty } from '#utils/helpers';

type JsonType = string | number | boolean | object | Array<any> | null;

export interface DataSet {
  [key: string]: JsonType;
}

export interface ResponseResult {
  data: DataSet | DataSet[];
  pagination?: ResponsePagination;
}

export interface ResponsePagination {
  page: number;
  limit: number;
  total: number;
  // lastPage?: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataClientService {
  static prefix = environment.apiUrl;

  constructor(
    protected httpClient: HttpClient,
    protected errorHandler: HttpErrorHandler,
    private storageService: LocalStorageService
  ) {}

  public get<T>(uri: string, params = {}, configs: any = {}): Observable<T> {
    const httpParams = this.generateHttpParams(params);
    return this.httpClient
      .get<T>(this.prefixUri(uri), {
        reportProgress: configs.reportProgress,
        params: httpParams,
        headers: this.generateHttpHeaders(configs.headers),
      })
      .pipe(catchError((err, caught) => this.handleError(err)));
  }

  public post<T>(
    uri: string,
    params: object = null,
    configs: any = {}
  ): Observable<T> {
    return this.httpClient
      .post<T>(this.prefixUri(uri), params, {
        reportProgress: configs.reportProgress,
        headers: this.generateHttpHeaders(configs.headers),
      })
      .pipe(catchError((err, caught) => this.handleError(err)));
  }

  public put<T>(uri: string, params: object = {}): Observable<T> {
    return this.httpClient
      .put<T>(this.prefixUri(uri), params, {
        headers: this.generateHttpHeaders(),
      })
      .pipe(catchError((err, caught) => this.handleError(err)));
  }

  public patch<T>(
    uri: string,
    params: object = {},
    configs: any = {}
  ): Observable<T> {
    return this.httpClient
      .patch<T>(this.prefixUri(uri), params, {
        headers: this.generateHttpHeaders(configs.headers),
      })
      .pipe(catchError((err, caught) => this.handleError(err)));
  }

  public delete<T>(uri: string, params: object = {}): Observable<T> {
    return this.httpClient
      .delete<T>(this.prefixUri(uri), {
        headers: this.generateHttpHeaders(),
      })
      .pipe(catchError((err, caught) => this.handleError(err)));
  }

  private prefixUri(uri: string) {
    if (uri.includes('http')) {
      return uri;
    }
    return DataClientService.prefix + uri;
  }

  private generateHttpParams(params: object) {
    let httpParams = new HttpParams({ encoder: new URLEncoder() });
    const objectToQueryString = (obj: object, prefix?: any) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const k = prefix ? prefix + '[' + key + ']' : key;
          const v = obj[key];
          if (v !== null && typeof v === 'object') {
            objectToQueryString(v, k);
          } else {
            if (!isNullOrUndefined(v) && !isStrEmpty(v.toString())) {
              httpParams = httpParams.append(k, v);
            }
          }
        }
      }
    };

    objectToQueryString(params);
    return httpParams;
  }

  private generateHttpHeaders(headerInfo?: object) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    if (this.storageService.get('access_token')) {
      headers = headers.set(
        'Authorization',
        `Bearer ${this.storageService.get('access_token')}`
      );
    }

    if (headerInfo) {
      for (const header of Object.keys(headerInfo)) {
        if (headerInfo[header]) {
          headers = headers.set(header, headerInfo[header]);
        } else {
          headers = headers.delete(header);
        }
      }
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    return this.errorHandler.handle(error);
  }
}
