import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  STOCK_POSITION_ADD,
  STOCK_POSITION_DEL,
  STOCK_POSITION_LIST_QUERY,
  STOCK_POSITION_UPD
} from '../../../common/system-parameter';
import {RestfulResponse} from '../../../common/vo/RestfulResponse';
import {AppConfigService} from '../../../common/services/app-config.service';
import {
  AddStationRequest,
  AddStationResponse, DelStationRequest, DelStationResponse,
  QryStationPageResponse,
  QryStationRequest,
  UpdStationRequest, UpdStationResponse
} from '../body0101.interface';


@Injectable({
  providedIn: 'root'
})
export class Api0101Service {

  constructor(private readonly http: HttpClient, private readonly config: AppConfigService) {}

  /**CALL *查詢站點資訊清單By查詢條件 API*/
  apiQryStationList(params: QryStationRequest): Observable<RestfulResponse<QryStationPageResponse>> {
    return this.http.post<RestfulResponse<QryStationPageResponse>>(
      this.config.apiUrl + STOCK_POSITION_LIST_QUERY,
      params
    );
  }

  /**CALL *新增站點 API*/
  apiAddStation(params: AddStationRequest): Observable<RestfulResponse<AddStationResponse>> {
    return this.http.post<RestfulResponse<AddStationResponse>>(
      this.config.apiUrl + STOCK_POSITION_ADD,
      params
    );
  }

  /**CALL *修改站點 API*/
  apiUpdStation(params: UpdStationRequest): Observable<RestfulResponse<UpdStationResponse>> {
    return this.http.post<RestfulResponse<UpdStationResponse>>(
      this.config.apiUrl + STOCK_POSITION_UPD,
      params
    );
  }

  /**CALL *刪除站點 API*/
  apiDelStation(params: DelStationRequest): Observable<RestfulResponse<DelStationResponse>> {
    return this.http.post<RestfulResponse<DelStationResponse>>(
      this.config.apiUrl + STOCK_POSITION_DEL,
      params
    );
  }


}
