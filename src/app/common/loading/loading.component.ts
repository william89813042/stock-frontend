import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoadingService} from 'src/app/common/loading/loading.service';

@Component({
  selector: 'app-loading',
  imports: [CommonModule, MatProgressSpinnerModule],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({opacity: 0}), animate('0.5s')]),
      transition(':leave', [animate('0.5s', style({opacity: 0}))]),
    ]),
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {
  }
}
