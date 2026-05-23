import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DebounceClickDirective } from '../../../../common/directives/debounce-click.directive';
import { LoadingService } from '../../../../common/loading/loading.service';
import { DialogService } from '../../../../common/dialog/dialog.service';
import { Api0101Service } from '../../services/api0101.service';
import { DelStockRequest, QryStockRequest, QryStockResponse } from '../../body0101.interface';
import { Qry0101SearchCriteria, Store0101Service } from '../../services/store0101.service';

@Component({
  selector: 'app-qry0101',
  imports: [
    ReactiveFormsModule, DebounceClickDirective, MatCardModule, MatDividerModule,
    MatPaginatorModule, MatButtonModule, MatDialogModule, MatTableModule,
    MatFormFieldModule, MatInputModule, TranslateModule, DatePipe, DecimalPipe
  ],
  templateUrl: './qry0101.component.html',
  styleUrl: './qry0101.component.scss'
})
export class Qry0101Component implements OnInit {

  validateForm!: FormGroup;
  dataSource = new MatTableDataSource<QryStockResponse>();
  displayedColumns: string[] = [
    'stockCode',
    'stockName',
    'purchaseDate',
    'purchaseQuantity',
    'purchasePrice',
    'purchaseTotalCost',
    'saleDate',
    'saleQuantity',
    'salePrice',
    'saleTotalAmount',
    'rate',
    'func'
  ];
  showTable = false;

  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly loading: LoadingService,
    private readonly dialog: DialogService,
    private readonly apiService: Api0101Service,
    private readonly storeService: Store0101Service
  ) {
  }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      stockCode: [null, [Validators.maxLength(4)]],
      stockName: [null, [Validators.maxLength(50)]],
      startDate: [null],
      endDate: [null]
    });

    if (this.storeService.getSubPageStatus()) {
      this.storeService.setSubPageStatus(false);
      this.validateForm.patchValue(this.storeService.getQry0101SearchCriteria().formValue);
    }
    this.pageIndex = this.storeService.getQry0101SearchCriteria().pageIndex;
    this.pageSize = this.storeService.getQry0101SearchCriteria().pageSize;
    this.callApiQryStock();
  }

  onPageChange(event: PageEvent): void {
    this.validateForm.patchValue(this.storeService.getQry0101SearchCriteria().formValue);
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.callApiQryStock();
  }

  submitForm() {
    if (!this.validateForm.valid) {
      this.validateForm.markAllAsTouched();
      return;
    }
    this.pageIndex = 0;
    this.callApiQryStock();
  }

  toAdd() {
    this.router.navigate(['/manage/stock-Body0101/add'], { skipLocationChange: true });
  }

  toUpd(data: QryStockResponse) {
    this.storeService.setStock(data);
    this.router.navigate(['/manage/stock-Body0101/upd'], { skipLocationChange: true });
  }

  toView(data: QryStockResponse) {
    this.storeService.setStock(data);
    this.router.navigate(['/manage/stock-Body0101/view'], { skipLocationChange: true });
  }

  submitDel(data: QryStockResponse) {
    this.dialog.openDialog('common.confirm', 'common.check.delete').afterClosed().subscribe(result => {
      if (result) {
        this.callApiDelStock(data);
      }
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }

  formatDateTimeForApi(value: string | null): string | null {
    if (!value) {
      return null;
    }
    return value.length === 16 ? `${value}:00` : value;
  }

  callApiQryStock() {
    const criteria: Qry0101SearchCriteria = {
      formValue: this.validateForm.value,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    this.storeService.setQry0101SearchCriteria(criteria);

    const req: QryStockRequest = {
      stockCode: this.validateForm.get('stockCode')?.value || null,
      stockName: this.validateForm.get('stockName')?.value || null,
      startDate: this.formatDateTimeForApi(this.validateForm.get('startDate')?.value),
      endDate: this.formatDateTimeForApi(this.validateForm.get('endDate')?.value),
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    const apiQuery$ = this.apiService.apiQryStockList(req);

    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        this.dataSource.data = result.data.content;
        this.totalItems = result.data.totalElements;
        this.showTable = true;
      },
      error: () => {
        this.dataSource.data = [];
        this.totalItems = 0;
        this.showTable = true;
      }
    });
  }

  callApiDelStock(data: QryStockResponse) {
    const req: DelStockRequest = {
      id: data.id,
      stockCode: data.stockCode
    };
    const apiQuery$ = this.apiService.apiDelStock(req);

    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: () => {
        this.dialog.openDialog('common.success', 'common.success.delete', {}, true).afterClosed().subscribe(() => {
          this.callApiQryStock();
        });
      }
    });
  }
}
