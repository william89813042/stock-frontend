import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../common/services/app-config.service';
import { RestfulResponse } from '../common/vo/RestfulResponse';
import { USER_REGISTER } from '../common/system-parameter';
import { RegisterRequest, RegisterResponse } from './register.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRegisterService {
  constructor(
    private readonly http: HttpClient,
    private readonly config: AppConfigService,
  ) {}

  /**CALL 使用者註冊 API*/
  apiRegister(
    params: RegisterRequest,
  ): Observable<RestfulResponse<RegisterResponse>> {
    return this.http.post<RestfulResponse<RegisterResponse>>(
      this.config.apiUrl + USER_REGISTER,
      params,
    );
  }
}
