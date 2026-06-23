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
import { ApiForgotPdService } from './api-forgotPd.service';
import { ForgotPasswordRequest } from './forgotPd.interface';

@Component({
  selector: 'app-forgot-pd',
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
  templateUrl: './forgotPd.component.html',
  styleUrl: './forgotPd.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ForgotPdComponent implements OnInit {
  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: UntypedFormGroup;

  //==========初始化設定==========

  constructor(
    private readonly router: Router,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly loading: LoadingService,
    private readonly dialog: DialogService,
    private readonly apiForgotPd: ApiForgotPdService,
  ) {}

  /**初始化忘記密碼表單 */
  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(500)]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/^09\d{8}$/)]],
    });
  }

  /**送出忘記密碼 */
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

    this.forgotPassword();
  }

  /**返回登入頁 */
  toLogin(): void {
    this.router.navigateByUrl('/login');
  }

  // ================CALL API=================

  /**忘記密碼 */
  private forgotPassword(): void {
    const req: ForgotPasswordRequest = {
      email: this.validateForm.get('email')?.value,
      phoneNumber: this.validateForm.get('phoneNumber')?.value,
    };

    const apiQuery$ = this.apiForgotPd.apiForgotPassword(req);

    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        this.dialog
          .openDialog('common.notify', '003.success.forgotPd', {}, true)
          .afterClosed()
          .subscribe(() => {
            this.router.navigateByUrl('/login');
          });
      },
    });
  }
}
