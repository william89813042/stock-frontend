import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Api0101Service } from '../../services/api0101.service';
import { Store0101Service } from '../../services/store0101.service';
import { AddStockRequest, AddStockVo, TransactionType } from '../../body0101.interface';
import { DebounceClickDirective } from '../../../../common/directives/debounce-click.directive';
import { LoadingService } from '../../../../common/loading/loading.service';
import { DialogService } from '../../../../common/dialog/dialog.service';

@Component({
  selector: 'app-add0101',
  imports: [
    ReactiveFormsModule, DebounceClickDirective, MatCardModule, MatDividerModule,
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    TranslateModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './add0101.component.html',
  styleUrl: './add0101.component.scss'
})
export class Add0101Component implements OnInit {

  validateForm!: FormGroup;

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
      transactionType: ['BUY' satisfies TransactionType, [Validators.required]],
      stockCode: [null, [Validators.required, Validators.maxLength(4)]],
      stockName: [null, [Validators.required, Validators.maxLength(50)]],
      purchaseDate: [null],
      purchaseQuantity: [null],
      purchasePrice: [null],
      saleDate: [null],
      saleQuantity: [null],
      salePrice: [null],
      memo: [null, [Validators.maxLength(200)]]
    });

    this.applyTransactionValidators(this.validateForm.get('transactionType')?.value);
    this.validateForm.get('transactionType')?.valueChanges.subscribe((type: TransactionType) => {
      this.applyTransactionValidators(type);
    });
  }

  get isBuy(): boolean {
    return this.validateForm.get('transactionType')?.value === 'BUY';
  }

  toQry() {
    this.storeService.setSubPageStatus(true);
    this.router.navigate(['/manage/stock-Body0101'], { skipLocationChange: true });
  }

  submitForm() {
    if (!this.validateForm.valid) {
      this.validateForm.markAllAsTouched();
      return;
    }

    const params = {
      stockCode: this.validateForm.get('stockCode')?.value,
      stockName: this.validateForm.get('stockName')?.value,
      transactionType: this.isBuy ? '買入' : '賣出'
    };
    this.dialog.openDialog('common.confirm', '0101.check.add', params).afterClosed().subscribe(result => {
      if (result) {
        this.callApiAddStock();
      }
    });
  }

  private applyTransactionValidators(type: TransactionType) {
    const buyControls = ['purchaseDate', 'purchaseQuantity', 'purchasePrice'];
    const sellControls = ['saleDate', 'saleQuantity', 'salePrice'];

    for (const name of buyControls) {
      const control = this.validateForm.get(name);
      control?.clearValidators();
      if (type === 'BUY') {
        control?.setValidators([Validators.required]);
      }
      control?.updateValueAndValidity();
    }

    for (const name of sellControls) {
      const control = this.validateForm.get(name);
      control?.clearValidators();
      if (type === 'SELL') {
        control?.setValidators([Validators.required]);
      }
      control?.updateValueAndValidity();
    }
  }

  private formatDateTimeForApi(value: string | Date | null): string | null {
    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');
      const day = String(value.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00`;
    }

    return value.length === 10 ? `${value}T00:00:00` : value.length === 16 ? `${value}:00` : value;
  }

  private buildAddStockVo(): AddStockVo {
    const transactionType = this.validateForm.get('transactionType')?.value as TransactionType;
    return {
      transactionType,
      stockCode: this.validateForm.get('stockCode')?.value,
      stockName: this.validateForm.get('stockName')?.value,
      purchaseDate: transactionType === 'BUY'
        ? this.formatDateTimeForApi(this.validateForm.get('purchaseDate')?.value)
        : null,
      purchaseQuantity: transactionType === 'BUY'
        ? Number(this.validateForm.get('purchaseQuantity')?.value)
        : null,
      purchasePrice: transactionType === 'BUY'
        ? Number(this.validateForm.get('purchasePrice')?.value)
        : null,
      saleDate: transactionType === 'SELL'
        ? this.formatDateTimeForApi(this.validateForm.get('saleDate')?.value)
        : null,
      saleQuantity: transactionType === 'SELL'
        ? Number(this.validateForm.get('saleQuantity')?.value)
        : null,
      salePrice: transactionType === 'SELL'
        ? Number(this.validateForm.get('salePrice')?.value)
        : null,
      memo: this.validateForm.get('memo')?.value || null
    };
  }

  callApiAddStock() {
    const req: AddStockRequest = {
      addStockList: [this.buildAddStockVo()]
    };
    const apiQuery$ = this.apiService.apiAddStock(req);

    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: () => {
        this.dialog.openDialog('common.success', 'common.success.add', {}, true).afterClosed().subscribe(() => {
          this.toQry();
        });
      }
    });
  }
}
