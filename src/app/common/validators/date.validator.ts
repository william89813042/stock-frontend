import {ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import dayjs from 'dayjs';


// 自訂日期驗證器(起日不得大於迄日)
export function startAfterEndValidator(startControlName: string, endControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start = formGroup.get(startControlName);
    const end = formGroup.get(endControlName);

    if (!start || !end) return null;

    const startDate = dayjs(start.value);
    const endDate = dayjs(end.value);

    if (startDate.isAfter(endDate)) {
      const error = {startAfterEnd: true};
      start.setErrors(error);
      end.setErrors(error);
      return error;
    }

    // 清除錯誤
    clearFieldErrors(start, ['startAfterEnd']);
    clearFieldErrors(end, ['startAfterEnd']);
    return null;
  };
}

// 自訂日期驗證器(區間範圍不超過 {{value}} 天)
export function rangeTooLongValidator(maxDays: number, startControlName: string, endControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start = formGroup.get(startControlName);
    const end = formGroup.get(endControlName);

    if (!start || !end) return null;

    const startDate = dayjs(start.value);
    const endDate = dayjs(end.value);

    if (endDate.diff(startDate, 'day') > maxDays) {
      const error = {rangeTooLong: true};
      start.setErrors(error);
      end.setErrors(error);
      return error;
    }

    clearFieldErrors(start, ['rangeTooLong']);
    clearFieldErrors(end, ['rangeTooLong']);
    return null;
  };
}

// 自訂日期驗證器(日期不得晚於今天)
export function dateInFutureValidator(dateControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start = formGroup.get(dateControlName);
    if (!start) return null;

    const startDate = dayjs(start.value);
    const today = dayjs().startOf('day');

    if (startDate.isAfter(today)) {
      const error = {startInFuture: true};
      start.setErrors(error);
      return error;
    }

    clearFieldErrors(start, ['startInFuture']);
    return null;
  };
}


/**
 * 至少要選擇一組日期區間 (多選一)
 * @param dateControlKeys 欄位名稱陣列，至少要有值
 */
export function atLeastOneDateRangeValidator(...dateControlKeys: string[]): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const dateControls = dateControlKeys.map(key => formGroup.get(key));

    // 判斷是否至少有一個 control 有值
    const hasValue = dateControls.some(d => !!d?.value);

    if (hasValue) {
      // 清除錯誤
      dateControls.forEach(d => clearFieldErrors(d!, ['requiredDateRange']));
      return null;
    } else {
      // 全部都沒值 → 加錯誤
      const error = {requiredDateRange: true};
      dateControls.forEach(d => d?.setErrors(error));
      return error;
    }
  };
}


function clearFieldErrors(control: AbstractControl, keysToClear: string[]) {
  if (!control.errors) return;
  keysToClear.forEach(key => delete control.errors![key]);
  if (Object.keys(control.errors).length === 0) {
    control.setErrors(null);
  } else {
    control.setErrors(control.errors); // 重新設定保留的錯誤
  }
}



