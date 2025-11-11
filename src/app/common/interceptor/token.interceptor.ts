import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  of,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import {AuthService} from 'src/app/auth/auth.service';
import {
  INVALID_TOKEN,
  LOGIN_TOKEN_EXPIRED,
  SUCCESS,
  TOKEN_MISMATCH,
} from '../system-parameter';

//處理每一個 HTTP 請求，以確保使用者的身份驗證 token 是有效的
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private readonly refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(private readonly auth: AuthService, private readonly router: Router) {
  }

  //intercept 方法會在每個 HTTP 請求發出前被調用。
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getAccToken();
    let authReq = request;

    //如果token存在且請求 URL 不包含 /login，則將token添加到請求中。
    if (token && !request.url.includes('/login')) {
      authReq = this.addToken(request, token);
    }

    //處理HTTP回應
    return next.handle(authReq).pipe(
      switchMap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          if (event.body.returnCode === LOGIN_TOKEN_EXPIRED) {

            return this.handleExpiredError(request, next);
          } else if (
            event.body.returnCode === INVALID_TOKEN || event.body.returnCode === TOKEN_MISMATCH
          ) {
            let errorObj = {
              message: event.body.returnMsg,
              code: event.body.returnCode,
            };
            throw new HttpErrorResponse({error: errorObj, status: 401});
          }
        }
        return of(event);
      }),
      catchError((error) => {
        console.log(error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  //處理TOKEN過期
  private handleExpiredError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //如果isRefreshing是false，則設置為true
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      //刷新token
      return this.auth.refreshToken().pipe(
        switchMap((result) => {
          this.isRefreshing = false;
          if (result.returnCode === SUCCESS) {
            const newAccessToken = result.data.tokenPair.accessToken;
            this.refreshTokenSubject.next(newAccessToken);
            //利用新的token處理請求
            return next.handle(this.addToken(request, newAccessToken));
          }
          let errorObj = {
            message: result.returnMsg,
            code: result.returnCode,
          };
          throw new HttpErrorResponse({error: errorObj, status: 401});
        }),
        catchError((error: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next('error');
          return throwError(() => error);
        })
      );
    }
    //如果 isRefreshing 為 true，等待 refreshTokenSubject 有新值
    return this.refreshTokenSubject.pipe(
      filter((token: string) => token !== null),
      take(1),
      switchMap((token) => {
        if (token !== 'error') {
          return next.handle(this.addToken(request, token));
        }
        throw new HttpErrorResponse({error: 401, status: 401});
      })
    );
  }

  //HEADER添加TOKEN的方法
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
