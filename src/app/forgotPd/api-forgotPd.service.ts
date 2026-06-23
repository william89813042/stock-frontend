import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../common/services/app-config.service';
import { USER_FORGOT_PD } from '../common/system-parameter';
import { RestfulResponse } from '../common/vo/RestfulResponse';
import { ForgotPasswordRequest } from './forgotPd.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiForgotPdService {
  constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService,
  ) {}

  /**CALL 忘記密碼 API*/
  apiForgotPassword(params: ForgotPasswordRequest): Observable<RestfulResponse<void>> {
    return this.http.post<RestfulResponse<void>>(
      this.config.apiUrl + USER_FORGOT_PD,
      params,
    );
  }
}
