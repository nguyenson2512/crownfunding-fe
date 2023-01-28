import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';

declare type HashMap<T = any> = {
  [key: string]: T;
};

@Pipe({
  name: 'trans',
  pure: false,
})
export class TranslatePipe extends TranslocoPipe implements PipeTransform {
  transform(
    key: string | null,
    params?: HashMap | undefined,
    inlineLang?: string | undefined
  ): string {
    let translateKey: string = key;
    if (params && params.postfix) {
      translateKey = `${translateKey}_${params.postfix}`;
    }
    return super.transform(translateKey, params, inlineLang);
  }
}
