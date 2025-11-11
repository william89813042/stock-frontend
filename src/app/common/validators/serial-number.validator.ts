import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


// 自訂序號驗證器(區間範圍不超過 {{value}})
export function serialNumberRangeTooLongValidator(maxNumber: number, startControlName: string, endControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const start = formGroup.get(startControlName);
    const end = formGroup.get(endControlName);

    if (!start || !end) return null;

    const startValue = Number(start.value);
    const endValue = Number(end.value);

    if (endValue - startValue > maxNumber) {
      const error = { serialNumberRangeTooLong: true };
      start.setErrors(error);
      end.setErrors(error);
      return error;
    }

    return null;
  };
}




