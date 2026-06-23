import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';

import { DebounceClickDirective } from '../common/directives/debounce-click.directive';
import { DialogService } from '../common/dialog/dialog.service';
import { LoadingService } from '../common/loading/loading.service';
import { passwordMatchValidator } from '../common/validators/password-match.validator';
import { pwdStrengthValidator } from '../common/validators/pwd-strength.validator';
import { ApiRegisterService } from './api-register.service';
import { RegisterRequest } from './register.interface';

@Component({
  selector: 'app-register',
  imports: [
    MatToolbarModule,
    DebounceClickDirective,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class RegisterComponent implements OnInit {
  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: UntypedFormGroup;

  //==========初始化設定==========

  constructor(
    private readonly router: Router,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly loading: LoadingService,
    private readonly dialog: DialogService,
    private readonly apiRegister: ApiRegisterService,
  ) {}

  /**初始化註冊表單 */
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group(
      {
        userId: [null, [Validators.required, Validators.maxLength(20)]],
        userName: [null, [Validators.required, Validators.maxLength(250)]],
        email: [null, [Validators.required, Validators.email, Validators.maxLength(500)]],
        phoneNumber: [
          null,
          [Validators.required, Validators.maxLength(10), Validators.pattern(/^09\d{8}$/)],
        ],
        userPd: [
          null,
          [Validators.required, Validators.maxLength(100), pwdStrengthValidator()],
        ],
        userPdConfirm: [
          null,
          [Validators.required, Validators.maxLength(100), pwdStrengthValidator()],
        ],
      },
      {
        validators: passwordMatchValidator('userPd', 'userPdConfirm'),
      },
    );
  }

  /**送出註冊 */
  submitForm(): void {
    this.validateForm.markAllAsTouched();

    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.register();
  }

  /**返回登入頁 */
  toLogin(): void {
    this.router.navigateByUrl('/login');
  }

  // ================CALL API=================

  /**註冊使用者 */
  private register(): void {
    const req: RegisterRequest = {
      userId: this.validateForm.get('userId')?.value,
      userName: this.validateForm.get('userName')?.value,
      email: this.validateForm.get('email')?.value,
      phoneNumber: this.validateForm.get('phoneNumber')?.value,
      userPd: this.validateForm.get('userPd')?.value,
    };

    const apiQuery$ = this.apiRegister.apiRegister(req);

    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: () => {
        this.dialog
          .openDialog('common.success', '002.success.register', {}, true)
          .afterClosed()
          .subscribe(() => {
            this.router.navigateByUrl('/login');
          });
      },
    });
  }
}
