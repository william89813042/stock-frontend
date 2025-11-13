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




