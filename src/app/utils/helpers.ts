export function isNullOrUndefined(value) {
  return value === null || value === undefined;
}

export function isStrEmpty(value: string): boolean {
  return isNullOrUndefined(value) || value.trim() === '';
}

export function isAllSpaceCharacter(value: string): boolean {
  const pattern = new RegExp('/^(s+S+s*)*(?!s).*$/');
  return pattern.test(value);
}
