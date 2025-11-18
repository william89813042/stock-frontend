import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Router} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {QryStationResponse} from '../../body0101.interface';
import {Store0101Service} from '../../services/store0101.service';

@Component({
  selector: 'app-view0101',
  imports: [
    ReactiveFormsModule, MatCardModule, MatDividerModule, MatButtonModule,
    MatSelectModule, MatDialogModule, MatFormFieldModule, MatInputModule, TranslateModule
  ],
  templateUrl: './view0101.component.html',
  styleUrl: './view0101.component.scss'
})
export class View0101Component implements OnInit {

  //==========變數宣告==========

  /**驗證表單*/
  validateForm!: FormGroup;
  /**暫存站點物件*/
  stationItem: QryStationResponse;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly storeService: Store0101Service
  ) {
    this.stationItem = this.storeService.getStation();
  }

  ngOnInit() {
    // 使用 formBuilder初始化表單
    this.validateForm = this.formBuilder.group({
      station: [this.stationItem.station],
      stationName: [this.stationItem.stationName],
      stationKind: [this.stationItem.stationKind],
      isActive: [this.stationItem.isActive],
    });

  }

  //==========方法==========

  /**轉導至查詢頁面 */
  toQry() {
    this.storeService.setSubPageStatus(true);
    this.router.navigate(['/manage/Qms-Body0101'], {skipLocationChange: true});
  }


}
