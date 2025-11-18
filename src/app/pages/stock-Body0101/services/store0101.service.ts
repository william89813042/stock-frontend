import {Injectable} from '@angular/core';
import {QryStationResponse} from '../body0101.interface';

//============定義暫存條件物件===========
export interface Qry0101SearchCriteria {
  formValue: Qry0101TempFormValue;
  pageIndex: number;
  pageSize: number;
}

export interface Qry0101TempFormValue {
  station: string | null;
  stationName: string | null;
  stationKind: string | null;
  isActive: boolean | null;
}

@Injectable({
  providedIn: 'root'
})
export class Store0101Service {

  constructor() {
  }

  //==========畫面轉導時，存放變數值==========

  /**站點資訊 */
  private station!: QryStationResponse;


  /**設置站點資訊 */
  setStation(station: QryStationResponse) {
    this.station = station;
  }

  /**取得站點資訊 */
  getStation(): QryStationResponse {
    return this.station;
  }


  //==========畫面轉導時，保存查詢條件==========

  private subPageStatus: boolean = false;

  public getSubPageStatus(): boolean {
    return this.subPageStatus;
  }

  public setSubPageStatus(status: boolean) {
    this.subPageStatus = status;
  }


  private qry0101SearchCriteria: Qry0101SearchCriteria = {
    formValue: {
      station: null,
      stationName: null,
      stationKind: null,
      isActive: null
    },
    pageIndex: 0,
    pageSize: 10
  };

  setQry0101SearchCriteria(criteria: Qry0101SearchCriteria) {
    this.qry0101SearchCriteria = criteria;
  }

  getQry0101SearchCriteria(): Qry0101SearchCriteria {
    return this.qry0101SearchCriteria;
  }


}
