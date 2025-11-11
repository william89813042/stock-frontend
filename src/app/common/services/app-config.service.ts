import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';

export interface AppConfig {
  production: boolean;
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig | null = null;

  constructor(private readonly http: HttpClient) {
  }

  async loadConfig(): Promise<void> {
    try {
      this.config = await firstValueFrom(
        this.http.get<AppConfig>('/assets/conf/config.json')
      );
      console.log('Config loaded:', this.config);
    } catch (error) {
      console.error('Failed to load config:', error);
      throw error;
    }
  }

  getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Config not loaded. Call loadConfig() first.');
    }
    return this.config;
  }

  get apiUrl(): string {
    return this.getConfig().apiUrl;
  }

  get isProduction(): boolean {
    return this.getConfig().production;
  }
}
