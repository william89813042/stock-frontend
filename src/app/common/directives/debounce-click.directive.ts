import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

/**
 * DebounceClick 防短時間內快速點擊button
 * 預設等待時間為200ms
 * <button appDebounceClick (debounceClick)="function()"> 使用
 */
@Directive({
  selector: '[appDebounceClick]',
  standalone: true,
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 200;
  @Output() debounceClick = new EventEmitter();
  private readonly clicks = new Subject();
  private subscription!: Subscription;

  constructor() {
    console.log('DebounceClickDirective is created . . .');
  }

  ngOnInit(): void {
    this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe((e) => {
        this.debounceClick.emit(e);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onclick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
