import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {QryStationResponse, UpdStationRequest} from '../../body0101.interface';
import {Api0101Service} from '../../services/api0101.service';
import {Store0101Service} from '../../services/store0101.service';
import {MatRadioModule} from '@angular/material/radio';
import {DebounceClickDirective} from '../../../../common/directives/debounce-click.directive';
import {LoadingService} from '../../../../common/loading/loading.service';
import {DialogService} from '../../../../common/dialog/dialog.service';

@Component({
  selector: 'app-upd0101',
  imports: [
    ReactiveFormsModule, DebounceClickDirective, MatCardModule, MatDividerModule,
    MatButtonModule, MatSelectModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, TranslateModule, MatRadioModule
  ],
  templateUrl: './upd0101.component.html',
  styleUrl: './upd0101.component.scss'
})
export class Upd0101Component implements OnInit {

  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: FormGroup;
  /**暫存站點物件*/
  stationItem: QryStationResponse;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly loading: LoadingService,
    private readonly dialog: DialogService,
    private readonly apiService: Api0101Service,
    private readonly storeService: Store0101Service,
    private readonly translate: TranslateService
  ) {
    this.stationItem = this.storeService.getStation();
  }

  ngOnInit() {
    // 使用 formBuilder初始化表單
    this.validateForm = this.formBuilder.group({
      id: [this.stationItem.id, [Validators.required]],
      station: [this.stationItem.station, [Validators.required, Validators.maxLength(3)]],
      stationName: [this.stationItem.stationName, [Validators.required, Validators.maxLength(50)]],
      stationKind: [this.stationItem.stationKind, [Validators.required]],
      isActive: [this.stationItem.isActive, [Validators.required]],
    });

  }

  //==========方法==========

  /**轉導至查詢頁面 */
  toQry() {
    this.storeService.setSubPageStatus(true);
    this.router.navigate(['/manage/Qms-Body0101'], {skipLocationChange: true});
  }

  /**送出修改 */
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
    // 設置確認修改視窗傳入的訊息
    const params = {
      station: this.validateForm.get('station')?.value,
      stationName: this.validateForm.get('stationName')?.value,
      stationKind: this.getStationKindText(this.validateForm.get('stationKind')?.value)
    };
    this.dialog.openDialog('common.confirm', '0101.check.upd', params).afterClosed().subscribe(result => {
      if (result) {
        this.callApiUpdStation();
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

  /**修改站點 */
  callApiUpdStation() {

    const req: UpdStationRequest = {...this.validateForm.value};
    const apiQuery$ = this.apiService.apiUpdStation(req);

    //當發送api時，調用加載器
    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        this.dialog.openDialog('common.success', 'common.success.upd', {}, true).afterClosed().subscribe(result => {
          this.toQry();
        })
      }
    });
  }

}
