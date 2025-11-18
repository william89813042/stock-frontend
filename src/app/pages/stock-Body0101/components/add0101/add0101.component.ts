import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {Router} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Api0101Service} from '../../services/api0101.service';
import {Store0101Service} from '../../services/store0101.service';
import {AddStationRequest} from '../../body0101.interface';
import {DebounceClickDirective} from '../../../../common/directives/debounce-click.directive';
import {LoadingService} from '../../../../common/loading/loading.service';
import {DialogService} from '../../../../common/dialog/dialog.service';

@Component({
  selector: 'app-add0101',
  imports: [
    ReactiveFormsModule, DebounceClickDirective, MatCardModule, MatDividerModule,
    MatButtonModule, MatSelectModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, TranslateModule, MatRadioModule
  ],
  templateUrl: './add0101.component.html',
  styleUrl: './add0101.component.scss'
})
export class Add0101Component implements OnInit {

  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly loading: LoadingService,
    private readonly dialog: DialogService,
    private readonly apiService: Api0101Service,
    private readonly storeService: Store0101Service,
    private readonly translate: TranslateService
  ) {
  }

  ngOnInit() {
    // 使用 formBuilder初始化表單
    this.validateForm = this.formBuilder.group({
      station: [null, [Validators.required, Validators.maxLength(3)]],
      stationName: [null, [Validators.required, Validators.maxLength(50)]],
      stationKind: [null, [Validators.required]],
      isActive: [true, [Validators.required]],
    });

  }

  //==========方法==========

  /**轉導至查詢頁面 */
  toQry() {
    this.storeService.setSubPageStatus(true);
    this.router.navigate(['/manage/Qms-Body0101'], {skipLocationChange: true});
  }

  /**送出新增 */
  submitForm() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity();
        }
      });
      return;
    }
    // 設置確認新增視窗傳入的訊息
    const params = {
      station: this.validateForm.get('station')?.value,
      stationName: this.validateForm.get('stationName')?.value,
      stationKind: this.getStationKindText(this.validateForm.get('stationKind')?.value)
    };
    this.dialog.openDialog('common.confirm', '0101.check.add', params).afterClosed().subscribe(result => {
      if (result) {
        this.callApiAddStation();
      }
    })
  }

  // 轉換成顯示用訊息
  getStationKindText(value: string): string {
    switch (value) {
      case 'NEC':
        return this.translate.instant('0101.nec');
      case 'BR':
        return this.translate.instant('0101.br');
      case 'EJ':
        return this.translate.instant('0101.ej');
      default:
        return value;
    }
  }


  //==========呼叫API方法==========

  /**新增站點 */
  callApiAddStation() {

    const req: AddStationRequest = {...this.validateForm.value};
    const apiQuery$ = this.apiService.apiAddStation(req);

    //當發送api時，調用加載器
    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        this.dialog.openDialog('common.success', 'common.success.add', {}, true).afterClosed().subscribe(result => {
          this.toQry();
        })
      }
    });
  }

}
