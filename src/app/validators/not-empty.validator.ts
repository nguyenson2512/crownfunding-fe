import { isAllSpaceCharacter, isStrEmpty } from '#utils/helpers';
import { AbstractControl } from '@angular/forms';

export function notEmpty(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (isStrEmpty(control?.value) || isAllSpaceCharacter(control?.value)) {
    return { emptyString: true };
  }
  return null;
}

export function notAllSpaceCharacter(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (new RegExp(/^\s+$/, 'm').test(control?.value)) {
    return { emptyString: true };
  }
  return null;
}
