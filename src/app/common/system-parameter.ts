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


//=========== 【0101 站點維護】===========


/**查詢站點清單By查詢條件url*/
export const STATION_LIST_QUERY = '/station/qry';

/**新增站點url*/
export const STATION_ADD = '/station/add';

/**修改站點url*/
export const STATION_UPD = '/station/upd';

/**刪除站點url*/
export const STATION_DEL = '/station/del';

//=========== 【0102 路線維護】===========


/**查詢路線清單By查詢條件url*/
export const LINE_LIST_QUERY = '/line/qry';

/**新增路線url*/
export const LINE_ADD = '/line/add';

/**修改路線url*/
export const LINE_UPD = '/line/upd';

/**刪除路線url*/
export const LINE_DEL = '/line/del';


//=========== 【0103 班次維護】===========


/**查詢班次清單By查詢條件url*/
export const LINETIME_LIST_QUERY = '/lineTime/qry';

/**查詢已啟用路線清單url*/
export const ACTIVE_NEC_LINE_LIST_QUERY = '/lineTime/qryActiveNecLineList';

/**新增班次url*/
export const LINETIME_ADD = '/lineTime/add';

/**修改班次url*/
export const LINETIME_UPD = '/lineTime/upd';

/**刪除班次url*/
export const LINETIME_DEL = '/lineTime/del';

/**CALL *查詢班次資訊清單 API*/
export const LINETIME_INFO_LIST_QUERY = '/lineTime/qryLineTimeInfoList';


//=========== 【0104 站點對照表維護】===========

/**查詢站點清單By查詢條件url*/
export const STATION_MAPPING_QUERY_STATION = '/stationMapping/qryStation';

/**查詢站點對照表By查詢條件url*/
export const STATION_MAPPING_LIST_QUERY = '/stationMapping/qryStationMapping';

/**查詢站點清單url*/
export const STATION_MAPPING_QUERY_ALL_STATION = '/stationMapping/qryAllStation';

/**新增站點url*/
export const STATION_MAPPING_ADD = '/stationMapping/add';

/**修改站點url*/
export const STATION_MAPPING_UPD = '/stationMapping/upd';


//=========== 【0105 路線對照表維護】===========


/**查詢路線清單url*/
export const LINE_MAPPING_QUERY_LINE = '/lineMapping/qryLine';

/**查詢路線對照表By查詢條件url*/
export const LINE_MAPPING_LIST_QUERY = '/lineMapping/qryLineMapping';

/**新增路線對照表 API*/
export const LINE_MAPPING_ADD = '/lineMapping/add';

/**修改路線對照表 API*/
export const LINE_MAPPING_UPD = '/lineMapping/upd';


//=========== 【0106 路線停靠站】===========


/**查詢所有NEC路線及站點url*/
export const NEC_LINE_AND_STATION_QUERY = '/lineStation/qryNecLineAndStation';

/**查詢路線停靠站清單資訊url*/
export const NEC_LINESTATION_QUERY = '/lineStation/qry';

/**新增路線停靠站資訊url*/
export const NEC_LINESTATION_ADD = '/lineStation/add';

/**修改路線停靠站資訊url*/
export const NEC_LINESTATION_UPD = '/lineStation/upd';

/**刪除路線停靠站資訊url*/
export const NEC_LINESTATION_DEL = '/lineStation/del';

/**查詢車種資訊url*/
export const CARTYPE_LIST_QUERY = '/lineStation/qryCarType';

/**查詢路線停靠站By路線及車種url*/
export const LineSTAION_QUERY_BY_LINE_AND_CARTYPE = '/lineStation/qryByLineAndCarType';


//=========== 【0107 乘車碼維護】===========


/**查詢乘車碼清單by查詢條件 url*/
export const QRCODE_QUERY = '/qrCode/qry';

/**修改乘車碼清單url*/
export const QRCODE_UPD = '/qrCode/upd';

/**CALL *檢視乘車碼資訊清單By票號 url */
export const QRCODE_INFO_LIST_QUERY = '/qrCode/qryBusQrCodeInfoList';


//=========== 【0201 憑單資料查詢】===========

/**憑單資料查詢清單by查詢條件 url*/
export const VOUCHER_QRY = '/voucher/qry';

/**檢視車票狀態資訊清單By票號 url*/
export const VOUCHER_LIST_QUERY = '/voucher/qryVoucherList';

/**查詢站點代碼 url*/
export const VOUCHER_STACD_QRY = '/voucher/qryVoucherStacd';

/**查詢路線代碼 url*/
export const LINENO_AND_LINEANO_QRY = '/voucher/qryLineNoAndLineANo';

/**查詢參數代碼檔 url*/
export const SON_CODE_ID_QRY = '/voucher/qrySonCodeId';

//=========== 【0202 寶錄API日誌查詢】===========


/**查詢交易種類url*/
export const TRANSACTION_TYPE_QUERY = '/brApiLogQuery/qryTransactionType';

/**查詢寶錄API日誌url*/
export const BR_API_LOG_QUERY = '/brApiLogQuery/qry';

/**查詢寶錄API日誌詳細資訊url*/
export const BR_API_LOG_QUERY_DETAIL = '/brApiLogQuery/qryDetail';


//=========== 【0203 介接API日誌查詢】===========


/**查詢交易種類url*/
export const INTEGRATION_TRANSACTION_TYPE_QUERY = '/integrationApiLogQuery/qryTransactionType';

/**查詢介接API日誌url*/
export const INTEGRATION_API_LOG_QUERY = '/integrationApiLogQuery/qry';

/**查詢介接API日誌詳細資訊url*/
export const INTEGRATION_API_LOG_QUERY_DETAIL = '/integrationApiLogQuery/qryDetail';


//=========== 【0204 車票狀態查詢】===========

/**查詢車票狀態 url*/
export const TICKET_STATUS_QRY = '/ticketStatus/qry';

/**檢視車票狀態資訊清單By票號 url*/
export const TICKET_STATUS_LIST_QUERY = '/ticketStatus/qryTicketStatusInfoList';

/**查詢訂票管道 url*/
export const PAYMENT_CHANNEL_QRY = '/ticketStatus/qryPaymentChannel';

/**查詢訂票管道 url*/
export const PAYMENT_KIND_QRY = '/ticketStatus/qryPaymentKind';

/**查詢退票管道 url*/
export const REFUND_CHANNEL_QRY = '/ticketStatus/qryRefundChannel';


//=========== 【0205 各班次乘車人數查詢】===========


/**查詢站點與路線url*/
export const PASSENGER_STATION_AND_LINE_QUERY = '/passengerCount/qryStationAndLine';

/**查詢各班次乘車人數url*/
export const PASSENGER_COUNT_QUERY = '/passengerCount/qry';


//=========== 【0206 班次營收資料查詢】===========

/**查詢班次營收資料url*/
export const SCHEDULE_REVENUE_QUERY = '/scheduleRevenue/qry';

/**檢視班次營收資料清單By憑單號碼 url*/
export const SCHEDULE_REVENUE_LIST_QUERY = '/scheduleRevenue/qryScheduleRevenueInfoList';


//=========== 【0801 取消登車日報表】===========

/**查詢取消登車資訊清單By查詢條件url*/
export const CANCEL_BOARDING_QUERY = '/cancelBoarding/qry';

/**匯出取消登車資訊報表By查詢條件url*/
export const CANCEL_BOARDING_EXPORT = '/cancelBoarding/export';

/**查詢NEC路線資訊url*/
export const NEC_LINE_QUERY = '/cancelBoarding/qryLine';

//=========== 【0802 強迫登車日報表】===========

/**查詢強迫登車資訊清單By查詢條件url*/
export const FORCED_BOARDING_QUERY = '/forcedBoarding/qry';

/**匯出強迫登車資訊報表By查詢條件url*/
export const FORCED_BOARDING_EXPORT = '/forcedBoarding/export';

/**查詢NEC路線資訊url*/
export const FORCED_NEC_LINE_QUERY = '/forcedBoarding/qryLine';

/**查詢強迫登車原因清單url*/
export const FORCED_REASON_CODE_QUERY = '/forcedBoarding/qryForcedReason';

//=========== 【0803 付款未取票日報表】===========

/**查詢付款未取票資訊清單By查詢條件url*/
export const PAYMENT_NOTICKET_QUERY = '/paymentNoTicket/qry';

/**匯出付款未取票資訊報表By查詢條件url*/
export const PAYMENT_NOTICKET_EXPORT = '/paymentNoTicket/export';

/**查詢NEC路線資訊url*/
export const PAYMENT_NOTICKET_NEC_LINE_QUERY = '/paymentNoTicket/qryLine';

//=========== 【0804 付款未取票未搭車日報表】===========

/**查詢付款取票未搭車資訊清單By查詢條件url*/
export const PAYMENT_NORIDE_QUERY = '/paymentNoRide/qry';

/**匯出付款未取票未搭車資訊報表By查詢條件url*/
export const PAYMENT_NORIDE_EXPORT = '/paymentNoRide/export';

/**查詢NEC路線資訊url*/
export const PAYMENT_NORIDE_NEC_LINE_QUERY = '/paymentNoRide/qryLine';

//=========== 【0805 未刷下車紀錄日報表】===========

/**查詢未刷下車紀錄By查詢條件url*/
export const UNSWIPED_EXIT_RECORD_QUERY = '/unswipedExitRecord/qry';

/**匯出未刷下車紀錄報表By查詢條件url*/
export const UNSWIPED_EXIT_RECORD_EXPORT = '/unswipedExitRecord/export';

/**查詢NEC路線資訊url*/
export const UNSWIPED_EXIT_RECORD_NEC_LINE_QUERY = '/unswipedExitRecord/qryLine';


//=========== 【0806 強迫開班日報表】===========

/**查詢強迫開班By查詢條件url*/
export const FORCED_CLASS_QUERY = '/forcedClass/qry';

/**匯出強迫開班報表By查詢條件url*/
export const FORCED_CLASS_EXPORT = '/forcedClass/export';

/**查詢前置條件url*/
export const FORCED_CLASS_PRE_QRY = '/forcedClass/preQry';


//=========== 【0807 已開班未登打東捷憑單紀錄日報表】===========

/**查詢已開班未登打東捷憑單紀錄日報表清單By查詢條件url*/
export const EJ_VOUCHER_RECORD_QUERY = '/ejVoucherRecord/qry';

/**匯出已開班未登打東捷憑單紀錄日報表資訊報表By查詢條件url*/
export const EJ_VOUCHER_RECORD_EXPORT = '/ejVoucherRecord/export';

/**查詢東捷公總路線資訊url*/
export const EJ_LINE_QUERY = '/ejVoucherRecord/qryEjLine';


//=========== 【0901 使用者維護】===========

/**查詢使用者清單By查詢條件url*/
export const USER_LIST_QUERY = '/user/qry';

/**查詢所有部門清單url*/
export const USER_DEPT_LIST_QUERY = '/user/qryDeptList';

/**查詢已啟用群組清單url*/
export const USER_ROLE_LIST_QUERY = '/user/qryRoleList';

/**新增使用者及使用者群組url*/
export const USER_ADD = '/user/add';

/**查詢特定使用者群組url*/
export const USER_ROLE_QUER = '/user/qryUserRole';

/**修改使用者及使用者群組url*/
export const USER_UPD = '/user/upd';

/**刪除使用者及使用者群組url*/
export const USER_DEL = '/user/del';


//=========== 【0902 角色權限維護】===========


/**查詢角色權限清單By查詢條件 url*/
export const ROLE_AUTH_QUERY = '/userAuth/qry';

/**查詢角色代號下拉選單u rl*/
export const ROLE_ID_QUERY = '/userAuth/qryRoleIdList';

/**新增角色及角色權限群組 url*/
export const ROLE_AUTH_ADD = '/userAuth/add';

/**檢視角色權限設定By角色ID url*/
export const ROLE_AUTH_ROLEID_QRY = '/userAuth/qryRoleId';

/**角色權限設定清單 url*/
export const ROLE_AUTH_LIST_QUERY = '/userAuth/qryRoleAuth';

/**修改角色及角色權限群組 url*/
export const ROLE_AUTH_UPD = '/userAuth/upd';



//=========== 【0903 批次排程管理】===========

/**查詢批次排程種類 url*/
export const SCHEDULEJOB_TYPE_QUERY = '/scheduleJob/qryType';

/**手動呼叫執行排程 url*/
export const SCHEDULEJOB_EXECUTE = '/scheduleJob/forceExecute';

/**查詢特定排程種類執行歷程 url*/
export const SCHEDULEJOB_QUERY = '/scheduleJob/qry';

/**查詢特定排程歷程詳細資訊 url*/
export const SCHEDULEJOB_DETAIL_QUERY = '/scheduleJob/qryDetail';




//=========== 【0904 功能清單維護】===========


/**查詢功能清單By查詢條件url*/
export const FUNC_LIST_QUERY = '/func/qry';

/**查詢功能清單By查詢條件url*/
export const PARENT_FUNC_LIST_QUERY = '/func/qryParentFunc';

/**新增功能url*/
export const FUNC_ADD = '/func/add';

/**修改功能url*/
export const FUNC_UPD = '/func/upd';

/**刪除功能url*/
export const FUNC_DEL = '/func/del';


//=========== 【0905 使用者操作紀錄】===========


/**查詢使用者操作紀錄By查詢條件url*/
export const USER_OPT_REC_QRY = '/user-opt-rec/qry';

/**查詢功能代號url*/
export const FUNCTION_CODE_QRY = '/user-opt-rec/qryFunctionCode';

/**查詢系統功能檔清單url*/
export const USER_OPT_REC_GRP_QRY = '/user-opt-rec/qryUserOptGrp';



//=========== 【0906 參數代碼檔】===========


/**查詢參數代碼檔by查詢條件url*/
export const PARAM_LIST_QUERY = '/param/qry';

/**查詢所有部門清單url*/
export const MAINCODEID_QUERY = '/param/qryMainCodeId';

/**新增參數代碼檔url*/
export const PARAM_ADD = '/param/add';

/**修改參數代碼檔url*/
export const PARAM_UPD = '/param/upd';

/**刪除參數代碼檔url*/
export const PARAM_DEL = '/param/del';

/**CALL *查詢參數代碼檔資訊清單 API*/
export const PARAM_INFO_LIST_QUERY = '/param/qryParamInfoList';

