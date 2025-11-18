//=========== 【frontend route】===========

/**首頁*/
export const MAIN_ROUTE = '';

//=========== 【api response code】===========

/**成功*/
export const SUCCESS = '00000';

/**Token 已逾期*/
export const LOGIN_TOKEN_EXPIRED = '80001';

/**Refresh Token 已逾期*/
export const REFRESH_TOKEN_EXPIRED = '80002';

/**無效的Token*/
export const INVALID_TOKEN = '80003';

/**Token 與 Refresh Token 識別碼不相符*/
export const TOKEN_MISMATCH = '80004';


//=========== 【100 登入作業】===========

/**使用者AD登入url*/
export const USER_LOGIN = '/user-login/login';
/**使用者令牌刷新url*/
export const USER_TOKEN_REFRESH = '/user-login/token-refresh';
/**使用者變更密碼url*/
export const USER_PD_CHANGE = '/user-login/change-pd';


//=========== 【0101 股票倉位維護】===========


/**查詢倉位by查詢條件url*/
export const STOCK_POSITION_LIST_QUERY = '/stockPosition/qry';

/**檢視倉位by股票代號url*/
export const STOCK_POSITION_LIST_VIEW = '/stockPosition/view';

/**新增股票倉位url*/
export const STOCK_POSITION_ADD = '/stockPosition/add';

/**修改股票倉位url*/
export const STOCK_POSITION_UPD = '/stockPosition/upd';

/**刪除股票倉位url*/
export const STOCK_POSITION_DEL = '/stockPosition/del';



