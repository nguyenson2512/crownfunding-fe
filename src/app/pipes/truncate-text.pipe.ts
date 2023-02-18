import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, limit: number = 15, completeWords = true, trail = '…'): string {
    let lastIndex = limit;
    if (completeWords) {
      lastIndex = value.substr(0, limit).lastIndexOf(' ');
    };
    return value.length > limit ? `${value.substr(0, limit)}${trail}` : `${value.substr(0, limit)}`;
  }
}
