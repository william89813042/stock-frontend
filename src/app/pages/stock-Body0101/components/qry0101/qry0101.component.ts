import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DebounceClickDirective} from '../../../../common/directives/debounce-click.directive';
import {LoadingService} from '../../../../common/loading/loading.service';
import {DialogService} from '../../../../common/dialog/dialog.service';
import {Api0101Service} from '../../services/api0101.service';
import {DelStationRequest, QryStationRequest, QryStationResponse} from '../../body0101.interface';
import {Qry0101SearchCriteria, Store0101Service} from '../../services/store0101.service';

@Component({
  selector: 'app-qry0101',
  imports: [
    ReactiveFormsModule, DebounceClickDirective, MatCardModule, MatDividerModule,
    MatPaginatorModule, MatButtonModule, MatSelectModule, MatDialogModule,
    MatTableModule, MatFormFieldModule, MatInputModule, TranslateModule
  ],
  templateUrl: './qry0101.component.html',
  styleUrl: './qry0101.component.scss'
})
export class Qry0101Component implements OnInit{

  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: FormGroup;
  /**table元素*/
  dataSource = new MatTableDataSource<QryStationResponse>();
  /**table欄位設定*/
  displayedColumns: string[] = ['station', 'stationName', 'stationKind', 'isActive', 'modifyId', 'func'];
  /**控制表格顯示的變數*/
  showTable: boolean = false;


  //==========設定分頁器==========

  pageIndex: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;

  onPageChange(event: PageEvent): void {
    this.validateForm.patchValue(this.storeService.getQry0101SearchCriteria().formValue);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.callApiQryStation();
  }

  //==========初始化設定==========

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
      station: [null, [Validators.maxLength(3)]],
      stationName: [null, [Validators.maxLength(50)]],
      stationKind: [null],
      isActive: [null]
    });

    //查詢條件放入(表示先前有查過)
    if (this.storeService.getSubPageStatus()) {
      this.storeService.setSubPageStatus(false);
      this.validateForm.patchValue(this.storeService.getQry0101SearchCriteria().formValue);
    }
    this.pageIndex = this.storeService.getQry0101SearchCriteria().pageIndex;
    this.pageSize = this.storeService.getQry0101SearchCriteria().pageSize;
    this.callApiQryStation();
  }


  //==========方法==========

  /**送出查詢條件表單 */
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
    this.pageIndex = 0; // 避免重新查詢時帶入先前的頁碼
    this.callApiQryStation();
  }

  /**跳轉至新增頁面 */
  toAdd() {
    this.router.navigate(['/manage/Qms-Body0101/add'], {skipLocationChange: true});
  }

  /**跳轉至修改頁面 */
  toUpd(data: QryStationResponse) {
    this.storeService.setStation(data);
    this.router.navigate(['/manage/Qms-Body0101/upd'], {skipLocationChange: true});
  }

  /**跳轉至檢視頁面 */
  toView(data: QryStationResponse) {
    this.storeService.setStation(data);
    this.router.navigate(['/manage/Qms-Body0101/view'], {skipLocationChange: true});
  }

  /**執行刪除站點 */
  submitDel(id: number) {
    this.dialog.openDialog('common.confirm', 'common.check.delete').afterClosed().subscribe(result => {
      if (result) {
        this.callApiDelStation(id);
      }
    })
  }

  /**重設form表單 */
  resetForm(): void {
    this.validateForm.reset();
  }

  // 轉換StationKind成顯示用訊息
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


  /** 查詢站點資訊清單By查詢條件 */
  callApiQryStation() {

    // 記錄查詢條件(表單及分頁)
    const criteria: Qry0101SearchCriteria = {
      formValue: this.validateForm.value,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.storeService.setQry0101SearchCriteria(criteria);

    // 設置請求參數
    const req: QryStationRequest = {
      ...this.validateForm.value,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    const apiQuery$ = this.apiService.apiQryStationList(req);

    // 當發送api時，調用加載器
    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        // 設置數據,分頁器,顯示Table
        this.dataSource.data = result.data.content;
        this.totalItems = result.data.totalElements;
        this.showTable = true;
      },
      error: (err) => {
        this.dataSource.data = [];
        this.totalItems = 0;
        this.showTable = true;
      }
    });
  }

  /** 刪除站點 */
  callApiDelStation(id: number) {

    // 設置請求參數
    const req: DelStationRequest = {id: id}
    const apiQuery$ = this.apiService.apiDelStation(req);

    // 當發送api時，調用加載器
    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        this.dialog.openDialog('common.notify', 'common.success.delete', {}, true).afterClosed().subscribe(result => {
          this.callApiQryStation();
        })
      }
    });
  }

}
