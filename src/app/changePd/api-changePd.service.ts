import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

//interface
import {LoadingService} from '../common/loading/loading.service';

//system-parameter
import {USER_PD_CHANGE} from '../common/system-parameter';
import {ChangePdRequest, ChangePdResponse} from './changePd.interface';
import { AppConfigService } from '../common/services/app-config.service';
import {RestfulResponse} from '../common/vo/RestfulResponse';


@Injectable({
  providedIn: 'root'
})
export class ApiChangePdService {

  constructor(private readonly http: HttpClient, private readonly config: AppConfigService) {
  }

  /**CALL 使用者啟用 API*/
  apiChangePd(params: ChangePdRequest): Observable<RestfulResponse<ChangePdResponse>> {
    return this.http.post<RestfulResponse<ChangePdResponse>>(
      this.config.apiUrl + USER_PD_CHANGE,
      params
    );
  }


}
