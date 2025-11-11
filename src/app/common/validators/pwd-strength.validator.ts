import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * 密碼強度驗證器：需長度至少8，並符合英文字母大小寫、數字、特殊符號中的三種。
 */
export function pwdStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) return null;

    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);
    const lengthValid = value.length >= 8;
    const passedCriteria = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
    const onlyAllowedChars = /^[a-zA-Z0-9!@#$%^&*]*$/.test(value);

    if (!onlyAllowedChars) {
      return {invalidCharacters: true};
    }

    if (!lengthValid) {
      return {passwordTooShort: true};
    }

    if (passedCriteria < 3) {
      return {passwordTooWeak: true};
    }

    return null;
  };
}
