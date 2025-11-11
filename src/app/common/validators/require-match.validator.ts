import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * 檢查輸入的值是來自autocomplete
 */
export function requireMatch(control: AbstractControl): ValidationErrors | null {
  const selection: any = control.value;
  if (typeof selection === 'string' && selection) {
    return {unmatchInput: true};
  }
  return null;
}
