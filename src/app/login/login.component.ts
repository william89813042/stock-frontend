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
import {ApiLoginService} from './api-login.service';

//防連點
import {DebounceClickDirective} from '../common/directives/debounce-click.directive';

//interface
import {LoginByAdRequest} from './login.interface';
import {pwdStrengthValidator} from '../common/validators/pwd-strength.validator';

@Component({
  selector: 'app-login',
  imports: [
    MatToolbarModule, DebounceClickDirective, MatDividerModule,
    MatCardModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, ReactiveFormsModule, TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: UntypedFormGroup;

  //==========初始化設定==========

  constructor(
    private readonly router: Router,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService,
    private readonly loading: LoadingService,
    private readonly apiLogin: ApiLoginService
  ) {
  }

  ngOnInit() {
    // 使用 formBuilder初始化表單
    // TODO: 移除帳號密碼
    this.validateForm = this.formBuilder.group({
      userId: ['ADMIN', [Validators.required, Validators.maxLength(50)]],
      userPd: ['Admin123', [Validators.required, Validators.maxLength(50), pwdStrengthValidator()]]
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
    this.login();

  }

  // ================CALL API=================

  /**使用者AD登入 */
  login() {
    const userId = this.validateForm.get('userId')?.value;
    const userPd = this.validateForm.get('userPd')?.value;
    const req: LoginByAdRequest = {
      userId: userId,
      userPd: userPd
    };
    console.log('req', req);
    const apiQuery$ = this.apiLogin.apiLogin(req);

    //當發送api時，調用加載器
    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {

        //變更為登入狀態
        this.authService.login();
        //設定token
        this.authService.setAccToken(result.data.tokenPair.accessToken);
        this.authService.setRefToken(result.data.tokenPair.refreshToken);
        //設定menu
        const menuList = result.data?.userFunctionMenuInfoList || [];
        this.authService.setMenuPermissions(menuList);
        //設定使用者資訊
        this.authService.setUser(result.data.userName);
        this.authService.setIsChange(result.data.isChange);
        //轉導歡迎頁面
        this.router.navigateByUrl('/manage/welcome');

      }
    });

  }
}
