import {BaseRequest} from '../common/vo/BaseRequest';


/**功能選單Item */
export interface UserFuncMenuInfo {
  funcCode: string;
  funcName: string;
  level: number;
  funcLink: string;
}

/**
 * 功能選單清單 (父+子)
 */
export interface UserFuncMenuList extends UserFuncMenuInfo {
  subFuncMenuList: UserFuncMenuInfo[];
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}


//==========登入畫面==========

/**登入使用者request  */
export interface LoginByAdRequest extends BaseRequest {
  userId: string;
  userPd: string;
}

/**登入使用者response  */
export interface LoginByAdResponse extends BaseRequest {
  userName: string;
  isChange: boolean;
  userFunctionMenuInfoList: UserFuncMenuInfo[];
  tokenPair: TokenPair;
}

/**刷新使用者令牌request*/

export interface RefreshUserTokenRequest extends BaseRequest {
  accessToken: string;
  refreshToken: string;
}


/**
 * 刷新使用者令牌response
 */
export interface RefreshUserTokenResponse {
  tokenPair: TokenPair;
}

