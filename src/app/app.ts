import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from './common/loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('stock-frontend');
}
