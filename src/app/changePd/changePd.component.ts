import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ReactiveFormsModule, Validators, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';

// material
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

//translate
import {TranslateModule} from '@ngx-translate/core';

//service
import {LoadingService} from '../common/loading/loading.service';

import {AuthService} from '../auth/auth.service';

//dialog
import {DialogService} from '../common/dialog/dialog.service';

//防連點
import {DebounceClickDirective} from '../common/directives/debounce-click.directive';

import {ChangePdRequest} from './changePd.interface';
import {pwdStrengthValidator} from '../common/validators/pwd-strength.validator';
import {ApiChangePdService} from './api-changePd.service';


@Component({
  selector: 'app-changePd',
  imports: [
    MatToolbarModule,
    DebounceClickDirective,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './changePd.component.html',
  styleUrl: './changePd.component.scss'
})
export class ChangePdComponent implements OnInit {

  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: UntypedFormGroup;

  userName!: string | null;

  //==========初始化設定==========

  constructor(
    private readonly router: Router,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly loading: LoadingService,
    private readonly dialog: DialogService,
    private readonly apiChangePd: ApiChangePdService
  ) {
    this.authService.user$.subscribe(user => {
      this.userName = user;
    });
  }

  ngOnInit() {
    // 使用 formBuilder初始化表單
    this.validateForm = this.formBuilder.group({
      userPdOld: [null, [Validators.required, Validators.maxLength(50)]],
      userPdNew: [null, [Validators.required, Validators.maxLength(50), pwdStrengthValidator()]],
      userPdConfirm: [null, [Validators.required, Validators.maxLength(50), pwdStrengthValidator()]]
    });
  }


  /**送出登入 */
  submitForm() {
    this.validateForm.markAllAsTouched(); // 標記所有控件為 "觸及"
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          //控件標記為髒（dirty）
          control.markAsDirty();
          //更新控件的驗證狀態
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      return;
    }
    this.changePd();

  }


  /**跳轉至歡迎頁面 */
  toWelcome() {
    this.authService.setIsChange(true);
    this.router.navigateByUrl('/manage/welcome');
  }


  // ================CALL API=================

  /**變更密碼 */
  changePd() {

    const userPdOld = this.validateForm.get('userPdOld')?.value;
    const userPdNew = this.validateForm.get('userPdNew')?.value;
    const req: ChangePdRequest = {
      userPdOld: userPdOld,
      userPdNew: userPdNew
    };
    const apiQuery$ = this.apiChangePd.apiChangePd(req);

    //當發送api時，調用加載器
    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        this.dialog.openDialog('common.edit', 'common.success.upd', {}, true);
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });

  }
}



