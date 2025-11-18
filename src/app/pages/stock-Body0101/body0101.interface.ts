import {PageBaseRequest} from '../../common/vo/PageBaseRequest';
import {BaseRequest} from '../../common/vo/BaseRequest';

//==========查詢畫面==========

/**查詢站點清單By查詢條件request */
export interface QryStationRequest extends PageBaseRequest {
  station: string;
  stationName: string;
  stationKind: string;
  isActive: boolean;
}

/**查詢站點清單By查詢條件response */
export interface QryStationResponse {
  id: number;
  station: string;
  stationName: string;
  stationKind: string;
  isActive: boolean;
  modifyId: string;
}

/**查詢站點清單By查詢條件response */
export interface QryStationPageResponse {
  content: QryStationResponse[];
  totalElements: number;
  size: number;
  number: number;
}


/**刪除站點Request */
export interface DelStationRequest extends BaseRequest {
  id: number;
}

/**刪除站點response */
export interface DelStationResponse {
}


//==========新增畫面==========

/**新增站點Request */
export interface AddStationRequest extends BaseRequest {
  station: string;
  stationName: string;
  stationKind: string;
  isActive: boolean;
}

/**新增站點response */
export interface AddStationResponse {
}


//==========修改畫面==========

/**修改站點Request */
export interface UpdStationRequest extends BaseRequest {
  id: number;
  station: string;
  stationName: string;
  stationKind: string;
  isActive: boolean;
}

/**修改站點response */
export interface UpdStationResponse {
}
