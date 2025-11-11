import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

//interface
import {RestfulResponse} from 'src/app/common/vo/RestfulResponse';
import {LoginByAdRequest, LoginByAdResponse} from './login.interface';

//system-parameter
import {USER_LOGIN} from '../common/system-parameter';
import { AppConfigService } from '../common/services/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  constructor(private readonly http: HttpClient, private readonly config: AppConfigService) {
  }

  /**CALL 使用者AD登入 API*/
  apiLogin(params: LoginByAdRequest): Observable<RestfulResponse<LoginByAdResponse>> {
    return this.http.post<RestfulResponse<LoginByAdResponse>>(
      this.config.apiUrl + USER_LOGIN,
      params
    );
  }


}
