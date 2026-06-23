import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * 驗證兩個密碼欄位是否一致
 * 說明：常用於註冊或變更密碼頁，避免兩次輸入的密碼不相同
 *
 * @param passwordKey 主密碼欄位名稱
 * @param confirmPasswordKey 確認密碼欄位名稱
 * @returns 驗證函式
 */
export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
