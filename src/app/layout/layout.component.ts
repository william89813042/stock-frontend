import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Router, RouterModule, RouterOutlet} from '@angular/router';

//material
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';

//day
import dayjs from 'dayjs';

//translate
import {TranslateModule} from '@ngx-translate/core';

//service
import {AuthService} from '../auth/auth.service';

//dialog
import {DialogService} from '../common/dialog/dialog.service';

//防連點
import {DebounceClickDirective} from '../common/directives/debounce-click.directive';


@Component({
  selector: 'app-layout',
  imports: [
    CommonModule, MatButtonModule, DebounceClickDirective,
    MatIconModule, MatToolbarModule, MatSidenavModule,
    MatListModule, MatMenuModule, MatSlideToggleModule,
    MatExpansionModule, RouterOutlet, TranslateModule,
    RouterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  currentTime = dayjs().format('YYYY/MM/DD');

  constructor(
    public authService: AuthService,
    private readonly router: Router,
    private readonly dialog: DialogService
  ) {
  }

  /**登出 */
  logout() {
    //確認視窗
    this.dialog.openDialog('common.confirm', 'common.check.logout').afterClosed().subscribe(result => {
      if (result) {  // 根據對話框返回的結果來執行 API 調用
        console.log('logged out');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    })
  }


}
