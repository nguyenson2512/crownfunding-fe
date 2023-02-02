import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  constructor(public translocoService: TranslocoService) {}

  translate(message: string, data?: any): string {
    return this.translocoService.translate(message, data);
  }

  translateObject(message: string, data?: any): any {
    return this.translocoService.translateObject(message, data);
  }
}
