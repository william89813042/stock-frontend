import {Component, Inject} from '@angular/core';
import {DebounceClickDirective} from 'src/app/common/directives/debounce-click.directive';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';


//translate
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    TranslateModule,
    DebounceClickDirective,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  // 根據 data.isAlert 判斷是否顯示確認按鈕
  get showConfirmButton(): boolean {
    return !this.data.isAlert;
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }


}
