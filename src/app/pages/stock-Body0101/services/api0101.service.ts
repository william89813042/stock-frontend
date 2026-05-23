import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  STOCK_POSITION_ADD,
  STOCK_POSITION_DEL,
  STOCK_POSITION_LIST_QUERY,
  STOCK_POSITION_LIST_VIEW,
  STOCK_POSITION_UPD
} from '../../../common/system-parameter';
import { RestfulResponse } from '../../../common/vo/RestfulResponse';
import { AppConfigService } from '../../../common/services/app-config.service';
import {
  AddStockRequest,
  AddStockResponse,
  DelStockRequest,
  DelStockResponse,
  QryStockPageResponse,
  QryStockRequest,
  UpdStockRequest,
  UpdStockResponse,
  ViewStockRequest,
  ViewStockResponse
} from '../body0101.interface';

@Injectable({
  providedIn: 'root'
})
export class Api0101Service {

  constructor(private readonly http: HttpClient, private readonly config: AppConfigService) {}

  apiQryStockList(params: QryStockRequest): Observable<RestfulResponse<QryStockPageResponse>> {
    return this.http.post<RestfulResponse<QryStockPageResponse>>(
      this.config.apiUrl + STOCK_POSITION_LIST_QUERY,
      params
    );
  }

  apiViewStockList(params: ViewStockRequest): Observable<RestfulResponse<ViewStockResponse[]>> {
    return this.http.post<RestfulResponse<ViewStockResponse[]>>(
      this.config.apiUrl + STOCK_POSITION_LIST_VIEW,
      params
    );
  }

  apiAddStock(params: AddStockRequest): Observable<RestfulResponse<AddStockResponse>> {
    return this.http.post<RestfulResponse<AddStockResponse>>(
      this.config.apiUrl + STOCK_POSITION_ADD,
      params
    );
  }

  apiUpdStock(params: UpdStockRequest): Observable<RestfulResponse<UpdStockResponse>> {
    return this.http.post<RestfulResponse<UpdStockResponse>>(
      this.config.apiUrl + STOCK_POSITION_UPD,
      params
    );
  }

  apiDelStock(params: DelStockRequest): Observable<RestfulResponse<DelStockResponse>> {
    return this.http.post<RestfulResponse<DelStockResponse>>(
      this.config.apiUrl + STOCK_POSITION_DEL,
      params
    );
  }
}
