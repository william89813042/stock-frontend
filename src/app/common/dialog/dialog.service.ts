import {Injectable} from '@angular/core';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private readonly dialog: MatDialog,
    private readonly translate: TranslateService
  ) {
    console.log('DialogService is created . . .');
  }

  openDialog(title: string, msg: string, msgParam?: {}, isAlert: boolean = false) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: this.translate.instant(title),
        msg: this.translate.instant(msg, msgParam),
        isAlert: isAlert, // 新增參數用來判斷是否顯示確認按鈕
      },
    });
    return dialogRef;
  }
}

