import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { QryStockResponse, ViewStockResponse } from '../../body0101.interface';
import { Store0101Service } from '../../services/store0101.service';
import { Api0101Service } from '../../services/api0101.service';
import { LoadingService } from '../../../../common/loading/loading.service';

@Component({
  selector: 'app-view0101',
  imports: [
    ReactiveFormsModule, MatCardModule, MatDividerModule, MatButtonModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, TranslateModule,
    MatTableModule, DatePipe, DecimalPipe
  ],
  templateUrl: './view0101.component.html',
  styleUrl: './view0101.component.scss'
})
export class View0101Component implements OnInit {

  validateForm!: FormGroup;
  stockItem: QryStockResponse;
  dataSource = new MatTableDataSource<ViewStockResponse>();
  displayedColumns: string[] = [
    'purchaseDate',
    'purchaseQuantity',
    'purchasePrice',
    'purchaseTotalCost',
    'saleDate',
    'saleQuantity',
    'salePrice',
    'saleTotalAmount',
    'netProfit',
    'rate',
    'memo'
  ];

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly storeService: Store0101Service,
    private readonly apiService: Api0101Service,
    private readonly loading: LoadingService
  ) {
    if (!this.storeService.hasStock()) {
      this.router.navigate(['/manage/stock-Body0101'], { skipLocationChange: true });
    }
    this.stockItem = this.storeService.getStock();
  }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      stockCode: [this.stockItem.stockCode],
      stockName: [this.stockItem.stockName]
    });
    this.callApiViewStock();
  }

  toQry() {
    this.storeService.setSubPageStatus(true);
    this.router.navigate(['/manage/stock-Body0101'], { skipLocationChange: true });
  }

  callApiViewStock() {
    const apiQuery$ = this.apiService.apiViewStockList({
      id: this.stockItem.id,
      stockCode: this.stockItem.stockCode,
      purchaseDate: this.stockItem.purchaseDate
    });

    this.loading.showLoaderUntilCompleted(apiQuery$).subscribe({
      next: (result) => {
        this.dataSource.data = result.data.filter(item => item.stockCode === this.stockItem.stockCode);
      },
      error: () => {
        this.dataSource.data = [];
      }
    });
  }
}
