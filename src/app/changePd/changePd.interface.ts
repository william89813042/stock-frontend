import {BaseRequest} from '../common/vo/BaseRequest';

//==========密碼變更畫面==========

/**使用者密碼變更request  */
export interface ChangePdRequest extends BaseRequest {
  userPdOld: string;
  userPdNew: string;
}

/**使用者密碼變更response  */
export interface ChangePdResponse {
}



