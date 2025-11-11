import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import {DialogService} from '../dialog/dialog.service';
import {SUCCESS} from '../system-parameter';
import {formatDate} from '@angular/common';
import { RestfulResponse } from '../vo/RestfulResponse';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private readonly dialog: DialogService
  ) {
  }

  //統一針對returnCode判斷處理
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestDateTime = formatDate(new Date(), 'yyyyMMddHHmmss', 'en-US', '+0800');
    let modifyRequest = req;

    //檢查是否為 ngx-translate 的 i18n 請求，避免translate失效的解法，可以研究是否有更好的方法
    if (req.url.includes('/assets/')) {
      return next.handle(req);
    }

    //若有requestBody存在就加入requestDateTime
    if (req.body) {
      modifyRequest = req.clone({
        body: {
          ...req.body,
          requestDateTime: requestDateTime
        }
      });
    }

    //response，針對回應code的判斷及錯誤處理
    return next.handle(modifyRequest).pipe(
      switchMap(event => {

        // 處理 Blob API 後端回 JSON 錯誤
        if (event instanceof HttpResponse && event.body instanceof Blob) {
          const contentType = event.headers.get('Content-Type') || '';
          if (contentType.includes('application/json')) {
            return from(event.body.text()).pipe(
              switchMap(text => {
                const json: RestfulResponse<any> = JSON.parse(text);
                return throwError(() => new Error(json.returnMsg));
              })
            );
          }
          return from([event]);
        }

        // 處理一般 JSON API
        if (event instanceof HttpResponse && event.body && typeof event.body === 'object') {
          const body = event.body;
          if ('returnCode' in body && body.returnCode !== SUCCESS) {
            return throwError(() => new Error(body.returnMsg));
          }
        }

        return from([event]);
      }),
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.dialog.openDialog(
            'common.error',
            `common.request.error.code.${error.status}`,
            {},
            true
          );
        } else {
          this.dialog.openDialog('common.notify', error.message, {}, true);
        }
        return throwError(() => error);
      })
    );
  }

}
