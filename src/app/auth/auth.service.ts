import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

//day
import dayjs from 'dayjs';

//interface
import {
  RefreshUserTokenRequest,
  RefreshUserTokenResponse,
  UserFuncMenuInfo,
  UserFuncMenuList
} from '../login/login.interface';
import {RestfulResponse} from '../common/vo/RestfulResponse';

//system-parameter
import {SUCCESS, USER_TOKEN_REFRESH} from '../common/system-parameter';
import { AppConfigService } from '../common/services/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient, private readonly config: AppConfigService) {
  }

  //==========變數宣告==========

  /**儲存空間 */
    // private storage = sessionStorage;
  private readonly storage = localStorage;
  /**權限清單 */
  private permissions: string[] = [];

  //==========監聽器設置==========

  private readonly menuSubject = new BehaviorSubject<UserFuncMenuList[]>([]);
  /**menu訂閱*/
  menu$ = this.menuSubject.asObservable();

  private readonly userSubject = new BehaviorSubject<string>("");
  /**user訂閱*/
  user$ = this.userSubject.asObservable();

  private readonly isChangeSubject = new BehaviorSubject<boolean>(false);
  /**isChange訂閱*/
  isChange$ = this.isChangeSubject.asObservable();


  //==========登入狀態設置==========

  private isLoggedIn = false;

  /**登入狀態 */
  loginStatus() {
    return this.isLoggedIn;
  }

  /**登入 */
  login() {
    this.isLoggedIn = true;
  }

  /**登出 */
  logout() {
    this.storage.clear();
    this.isLoggedIn = false;
  }

  /**儲存空間狀態 */
  storageStatus(): boolean {
    const accToken = this.getAccToken();
    const refToken = this.getRefToken();
    if (accToken && refToken) {
      return true;
    }
    return false;
  }

  //==========使用者資訊設置==========


  /**
   * 傳送使用者資訊給予訂閱者
   * @param userName 使用者名稱
   */
  setUser(userName: string) {
    this.userSubject.next(userName);
  }

  /**
   * 傳送使用者資訊給予訂閱者
   * @param userName 使用者名稱
   */
  setIsChange(isChange: boolean) {
    this.isChangeSubject.next(isChange);
  }


  getCurrentUser(): string {
    return this.userSubject.getValue();
  }

  getCurrentUserIsChange(): boolean {
    return this.isChangeSubject.getValue();
  }


  refreshToken(): Observable<RestfulResponse<RefreshUserTokenResponse>> {
    //??如果左側返回的是null或undefined則返回右側的值
    const accToken = this.getAccToken() ?? '';
    const refToken = this.getRefToken() ?? '';
    const now = dayjs().format('YYYY/MM/DD HH:mm:ss');
    let refreshReq: RefreshUserTokenRequest = {
      requestDateTime: now,
      accessToken: accToken,
      refreshToken: refToken
    };

    return this.http
      .post<RestfulResponse<RefreshUserTokenResponse>>(
        this.config.apiUrl + USER_TOKEN_REFRESH,
        refreshReq
      )
      .pipe(
        tap((result) => {
          if (result.returnCode === SUCCESS) {
            this.setAccToken(result.data.tokenPair.accessToken);
            this.setRefToken(result.data.tokenPair.refreshToken);
          }
        })
      );
  }


  //==========token 設置==========

  setAccToken(key: string) {
    this.storage.setItem('backEndAccToken', key);
  }

  getAccToken() {
    return this.storage.getItem('backEndAccToken');
  }

  setRefToken(key: string) {
    this.storage.setItem('backEndRefToken', key);
  }

  getRefToken() {
    return this.storage.getItem('backEndRefToken');
  }


  //==========功能選單設置==========
  /**
   * 設置使用者功能選單
   * @param origin 使用者功能選單資訊陣列
   */
  setMenuPermissions(origin: any): void {  // 暫時改成 any 來接收任何型別
    console.log('===== setMenuPermissions 詳細資訊 =====');
    console.log('接收到的資料型別:', typeof origin);
    console.log('是否為陣列:', Array.isArray(origin));
    console.log('資料內容:', origin);
    console.log('資料的 keys:', origin ? Object.keys(origin) : 'null');

    // 嘗試提取可能的陣列位置
    if (origin && typeof origin === 'object') {
      console.log('可能的欄位:');
      console.log('- origin.data:', origin.data);
      console.log('- origin.list:', origin.list);
      console.log('- origin.userFuncMenuInfoList:', origin.userFuncMenuInfoList);
      console.log('- origin.menuList:', origin.menuList);
    }
    console.log('======================================');

    // 嘗試從物件中提取陣列
    let menuArray: UserFuncMenuInfo[] = [];

    if (Array.isArray(origin)) {
      // 如果本身就是陣列，直接使用
      menuArray = origin;
    } else if (origin && typeof origin === 'object') {
      // 如果是物件，嘗試從常見的欄位中提取陣列
      menuArray = origin.userFuncMenuInfoList
        || origin.menuList
        || origin.list
        || origin.data
        || [];
    }

    console.log('[AuthService] 提取後的選單陣列:', menuArray);
    console.log('[AuthService] 選單陣列長度:', menuArray.length);

    // 檢查提取後的陣列
    if (!Array.isArray(menuArray) || menuArray.length === 0) {
      console.error('[AuthService] setMenuPermissions 接收到無效的資料', {
        原始資料型別: typeof origin,
        原始資料: origin,
        提取後的陣列: menuArray
      });
      this.setPermissions([]);
      this.setUserFuncMenu([]);
      return;
    }

    // 設定權限和選單
    this.setPermissions(menuArray);
    this.setUserFuncMenu(menuArray);
  }

  /**
   * 設置權限清單
   * @param origin
   */
  setPermissions(origin: UserFuncMenuInfo[]): void {
    this.permissions = [];
    origin
      //過濾出 funcLevel 等於 2 的項目
      .filter((item) => item.level === 2)
      .forEach((item) => {
        //將其 funcCode 加入到權限列表中
        this.permissions.push(item.funcCode);
      });
  }

  /**
   * 設置功能選單
   * @param origin 使用者功能選單資訊陣列
   */
  setUserFuncMenu(origin: UserFuncMenuInfo[]): void {
    // 防禦性檢查：確保 origin 是有效的陣列
    if (!origin || !Array.isArray(origin)) {
      console.warn('[AuthService] setUserFuncMenu 接收到無效的資料', origin);
      this.menuSubject.next([]);
      return;
    }

    const menuList: UserFuncMenuList[] = [];

    origin.forEach((item) => {
      // 確保 item 有效
      if (!item) {
        console.warn('[AuthService] 遇到無效的選單項目', item);
        return;  // 跳過這個項目，繼續下一個
      }

      // 如果 level 等於 1，則為主菜單
      if (item.level === 1) {
        const menu: UserFuncMenuList = {
          ...item,
          subFuncMenuList: [],
        };
        menuList.push(menu);
      } else {
        // 將子項目添加到最後一個主菜單的 subFuncMenuList 中
        const lastMenu = menuList[menuList.length - 1];
        if (lastMenu) {
          lastMenu.subFuncMenuList.push(item);
        } else {
          console.warn('[AuthService] 找不到父選單，無法加入子選單', item);
        }
      }
    });

    // 更新 menuSubject 通知訂閱者
    this.menuSubject.next(menuList);
    console.log('[AuthService] 選單設定完成，共', menuList.length, '個主選單');
  }


  //==========路由權限驗證==========

  /**
   * 權限驗證
   * @param routeCode
   * @returns
   */
  // 權限驗證 (確認是否有routeCode，若有則檢查該路由是否存在於權限列表)
  checkPermission(routeCode: string): boolean {
    return routeCode ? this.permissions.includes(routeCode) : true;
  }

}
