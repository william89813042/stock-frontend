import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { QryStockResponse, UpdStockRequest } from '../../body0101.interface';
import { Api0101Service } from '../../services/api0101.service';
import { Store0101Service } from '../../services/store0101.service';
import { DebounceClickDirective } from '../../../../common/directives/debounce-click.directive';
import { LoadingService } from '../../../../common/loading/loading.service';
import { DialogService } from '../../../../common/dialog/dialog.service';

@Component({
  selector: 'app-upd0101',
  imports: [
    ReactiveFormsModule, DebounceClickDirective, MatCardModule, MatDividerModule,
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule,
    TranslateModule
  ],
  templateUrl: './upd0101.component.html',
  styleUrl: './upd0101.component.scss'
})
export class Upd0101Component implements OnInit {

  validateForm!: FormGroup;
  stockItem: QryStockResponse;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly loading: LoadingService,
    private readonly dialog: DialogService,
    private readonly apiService: Api0101Service,
    private readonly storeService: Store0101Service
  ) {
    if (!this.storeService.hasStock()) {
      this.router.navigate(['/manage/stock-Body0101'], { skipLocationChange: true });
    }
    this.stockItem = this.storeService.getStock();
  }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      id: [this.stockItem.id, [Validators.required]],
      stockCode: [this.stockItem.stockCode, [Validators.required, Validators.maxLength(4)]],
      stockName: [this.stockItem.stockName, [Validators.required, Validators.maxLength(50)]],
      purchaseDate: [this.toDateTimeLocal(this.stockItem.purchaseDate), [Validators.required]],
      purchaseQuantity: [this.stockItem.purchaseQuantity, [Validators.required]],
      purchasePrice: [this.stockItem.purchasePrice, [Validators.required]],
      purchaseTotalCost: [this.stockItem.purchaseTotalCost, [Validators.required]]
    });
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
      stockName: this.validateForm.get('stockName')?.value
    };
    this.dialog.openDialog('common.confirm', '0101.check.upd', params).afterClosed().subscribe(result => {
      if (result) {
        this.callApiUpdStock();
      }
    });
  }

  recalcTotalCost() {
    const quantity = Number(this.validateForm.get('purchaseQuantity')?.value || 0);
    const price = Number(this.validateForm.get('purchasePrice')?.value || 0);
    this.validateForm.patchValue({
      purchaseTotalCost: Number((quantity * price).toFixed(2))
    });
  }

  private toDateTimeLocal(value: string | null): string | null {
    if (!value) {
      return null;
    }
    return value.substring(0, 16);
  }

  private formatDateTimeForApi(value: string): string {
    return value.length === 16 ? `${value}:00` : value;
  }

  callApiUpdStock() {
    const req: UpdStockRequest = {
      updStockList: [{
        id: this.validateForm.get('id')?.value,
        stockCode: this.validateForm.get('stockCode')?.value,
        stockName: this.validateForm.get('stockName')?.value,
        purchaseDate: this.formatDateTimeForApi(this.validateForm.get('purchaseDate')?.value),
        purchaseQuantity: Number(this.validateForm.get('purchaseQuantity')?.value),
        purchasePrice: Number(this.validateForm.get('purchasePrice')?.value),
        purchaseTotalCost: Number(this.validateForm.get('purchaseTotalCost')?.value)
      }]
    };
    const apiQuery$ = this.apiService.apiUpdStock(req);

    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: () => {
        this.dialog.openDialog('common.success', 'common.success.upd', {}, true).afterClosed().subscribe(() => {
          this.toQry();
        });
      }
    });
  }
}
