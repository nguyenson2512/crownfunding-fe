import { DatatablePagination } from '#interfaces/pagination.interface';
import { Model } from '#models/model';
import { DataSet, ResponseResult } from '#services/http-client.service';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

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

export const paginationMapper = <T extends Model>(
  model: new (...args: any) => T
): OperatorFunction<ResponseResult, DatatablePagination<T>> => {
  return map((result: ResponseResult) => ({
    pagination: result?.pagination,
    data: (result.data as DataSet[]).map((item) => new model(item)),
  }));
};

export function checkPermission(userRoles = [], accessRoles = []) {
  return accessRoles.find((ro) => userRoles.find((r) => r == ro.name))
    ? true
    : false;
}

export const onlyNumberInput = (event) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
};

export const getDaysRemaining = (duration: Date) => {
  const currentDate = new Date();
  const endOfDay = new Date(duration);
  const timeDiff = endOfDay.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysRemaining;
};

export function getAmountCertainElement(array, attribute, value) {
  return array.filter((element) => element[attribute] === value).length;
}
