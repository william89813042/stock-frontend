/**
 * 成功代碼:
 * returnCode = "0000";
 * returnMsg = "成功";
 *
 * 系統預設錯誤代碼:
 * returnCode = "9999";
 * returnMsg = "系統異常";
 */
export interface RestfulResponse<T> {
  returnCode: string;
  returnMsg: string;
  data: T;
}
