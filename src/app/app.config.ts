// 核心功能的引入
import {ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, LOCALE_ID, provideAppInitializer, inject} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

// 控制語言轉換（翻譯模組）
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// 控制UI區域設定
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

// 動畫相關設定
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

// HTTP攔截器相關設定
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TokenInterceptor} from './common/interceptor/token.interceptor';
import {ApiInterceptor} from './common/interceptor/api.interceptor';
import { AppConfigService } from './common/services/app-config.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}


registerLocaleData(zh); // 註冊繁體中文的本地化資料

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), // 異步動畫配置
    provideRouter(routes), // 提供路由配置
    provideZoneChangeDetection({eventCoalescing: true}), // 提供區域變更檢測
    provideAppInitializer(() => {
      const appConfigService = inject(AppConfigService);
      return appConfigService.loadConfig();
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.setDefaultLang('zh-TW');  // 設定預設語言
      translate.use('zh-TW');             // 立即使用繁體中文
    }),
    provideHttpClient(withInterceptorsFromDi()), // 提供 HTTP Client 並加上攔截器
    // 配置 HTTP Interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    importProvidersFrom(
      TranslateModule.forRoot({ //動態取得翻譯資源
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    {provide: LOCALE_ID, useValue: 'zh-TW'}
  ]
};
