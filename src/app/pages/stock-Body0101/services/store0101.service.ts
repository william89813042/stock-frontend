import { Injectable } from '@angular/core';
import { QryStockResponse } from '../body0101.interface';

export interface Qry0101SearchCriteria {
  formValue: Qry0101TempFormValue;
  pageIndex: number;
  pageSize: number;
}

export interface Qry0101TempFormValue {
  stockCode: string | null;
  stockName: string | null;
  startDate: string | null;
  endDate: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class Store0101Service {

  private stock!: QryStockResponse;
  private subPageStatus = false;

  private qry0101SearchCriteria: Qry0101SearchCriteria = {
    formValue: {
      stockCode: null,
      stockName: null,
      startDate: null,
      endDate: null
    },
    pageIndex: 0,
    pageSize: 10
  };

  setStock(stock: QryStockResponse) {
    this.stock = stock;
  }

  getStock(): QryStockResponse {
    return this.stock;
  }

  hasStock(): boolean {
    return !!this.stock;
  }

  getSubPageStatus(): boolean {
    return this.subPageStatus;
  }

  setSubPageStatus(status: boolean) {
    this.subPageStatus = status;
  }

  setQry0101SearchCriteria(criteria: Qry0101SearchCriteria) {
    this.qry0101SearchCriteria = criteria;
  }

  getQry0101SearchCriteria(): Qry0101SearchCriteria {
    return this.qry0101SearchCriteria;
  }
}
